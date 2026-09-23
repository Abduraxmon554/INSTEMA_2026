const CLICK_PAYMENT_URL =
  import.meta.env.VITE_CLICK_PAYMENT_URL || "https://my.click.uz/services/pay";

export function isClickConfigured() {
  return Boolean(
    import.meta.env.VITE_CLICK_SERVICE_ID &&
      import.meta.env.VITE_CLICK_MERCHANT_ID &&
      import.meta.env.VITE_CLICK_AMOUNT &&
      import.meta.env.VITE_CLICK_RETURN_URL
  );
}

export function buildClickPaymentUrl(transactionId) {
  const params = new URLSearchParams({
    service_id: import.meta.env.VITE_CLICK_SERVICE_ID,
    merchant_id: import.meta.env.VITE_CLICK_MERCHANT_ID,
    amount: import.meta.env.VITE_CLICK_AMOUNT,
    transaction_param: transactionId,
    return_url: import.meta.env.VITE_CLICK_RETURN_URL,
  });

  return `${CLICK_PAYMENT_URL}?${params.toString()}`;
}
