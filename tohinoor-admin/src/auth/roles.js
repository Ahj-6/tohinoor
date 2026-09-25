const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : fallback;
};

export const ROLE_IDS = {
  ADMIN: toNumber(import.meta.env.VITE_ADMIN_ROLE_ID, 1),
  OPERATOR: toNumber(import.meta.env.VITE_OPERATOR_ROLE_ID, 2),
  STUDENT: toNumber(import.meta.env.VITE_STUDENT_ROLE_ID, 3),
};

export const getRoleName = (roleId) => {
  if (roleId === ROLE_IDS.ADMIN) return 'admin';
  if (roleId === ROLE_IDS.OPERATOR) return 'operator';
  if (roleId === ROLE_IDS.STUDENT) return 'student';
  return 'unknown';
};

export const isAdminPanelRole = (roleId) =>
  roleId === ROLE_IDS.ADMIN || roleId === ROLE_IDS.OPERATOR;
