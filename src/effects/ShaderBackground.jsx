import { useEffect, useRef } from "react";

const VERTEX_SRC = `
  attribute vec2 aPos;
  void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

// Yumshoq, sekin oqadigan "liquid" gradient shader — sayt ranglariga
// moslashtirilgan (rust/sage/ink). Uchta sinusoidal domain-warp qatlami
// suyuqlik/aurora tuyg'usini beradi, og'ir 3D sahna kerak emas.
const FRAGMENT_SRC = `
  precision mediump float;
  uniform vec2 uRes;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.06;
    float w1 = sin(p.x * 2.2 + t * 1.3) * cos(p.y * 2.0 - t) * 0.5;
    float w2 = sin((p.x + p.y) * 1.6 - t * 0.8) * 0.5;
    vec2 warped = p + vec2(w1, w2) * 0.35;

    float d1 = length(warped - vec2(sin(t * 0.7) * 0.5, cos(t * 0.5) * 0.3));
    float d2 = length(warped - vec2(cos(t * 0.4) * -0.6, sin(t * 0.6) * 0.4));
    float d3 = length(warped - vec2(sin(t * 0.9 + 1.5) * 0.3, cos(t * 0.3 + 2.0) * -0.5));

    float g1 = smoothstep(0.9, 0.0, d1);
    float g2 = smoothstep(0.85, 0.0, d2);
    float g3 = smoothstep(0.95, 0.0, d3);

    vec3 color = uColorA * g1 + uColorB * g2 + uColorC * g3;
    float alpha = clamp(g1 + g2 * 0.8 + g3 * 0.7, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha * 0.65);
  }
`;

function hexToVec3(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function compile(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * WebGL Shader Animation — juda premium "wow" effekt. Xom WebGL
 * (Three.js'siz) fragment shader orqali oqib turuvchi gradient/liquid
 * fon chiziladi. WebGL mavjud bo'lmasa yoki reduced-motion bo'lsa,
 * hech narsa render qilinmaydi — orqadagi CSS aurora fon ko'rinadi.
 */
export default function ShaderBackground({
  colorA = "#b23a2e",
  colorB = "#57705f",
  colorC = "#8f2e25",
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uColorA = gl.getUniformLocation(program, "uColorA");
    const uColorB = gl.getUniformLocation(program, "uColorB");
    const uColorC = gl.getUniformLocation(program, "uColorC");

    gl.uniform3fv(uColorA, hexToVec3(colorA));
    gl.uniform3fv(uColorB, hexToVec3(colorB));
    gl.uniform3fv(uColorC, hexToVec3(colorC));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = null;
    let running = true;
    const parent = canvas.parentElement;

    function resize() {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }

    function tick(ts) {
      if (!running) return;
      gl.uniform1f(uTime, ts * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running && !raf) raf = requestAnimationFrame(tick);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [colorA, colorB, colorC]);

  return <canvas ref={canvasRef} className={`effect-canvas-layer ${className}`.trim()} aria-hidden="true" />;
}
