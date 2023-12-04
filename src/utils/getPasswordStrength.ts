export default function getPasswordStrength(password: string) {
  const strengthFull = 6;
  let strength = 0;
  if (/[A-Z-А-Я]/.test(password)) strength += 1;
  if (/[a-z-а-я]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[!,%,&,@,#,$,^,*,?,_,~]/.test(password)) strength += 1;
  if (password.length >= 5) strength += 1;
  if (password.length >= 8) strength += 1;
  return Math.trunc((strength * 100) / strengthFull);
}
