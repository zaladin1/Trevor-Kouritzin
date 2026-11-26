export const FORMSUBMIT_PRIMARY_EMAIL = 'tkouritz@ualberta.ca';
export const FORMSUBMIT_CC_EMAIL = 'zayn@bigskytek.com';
export const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_PRIMARY_EMAIL}`;

export interface FormSubmitPayload {
  subject: string;
  replyTo?: string;
  fields: Record<string, string>;
}

export async function submitToFormSubmit({
  subject,
  replyTo,
  fields,
}: FormSubmitPayload): Promise<void> {
  const response = await fetch(FORMSUBMIT_AJAX_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _cc: FORMSUBMIT_CC_EMAIL,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
      ...(replyTo ? { _replyto: replyTo } : {}),
      ...fields,
    }),
  });

  let data: { success?: string | boolean; message?: string } | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  const succeeded =
    response.ok &&
    data?.success !== false &&
    data?.success !== 'false';

  if (!succeeded) {
    throw new Error(
      data?.message || 'Unable to submit right now. Please try again or email Info@DoctorTrev.com directly.'
    );
  }
}
