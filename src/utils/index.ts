export const getItemFromStorage = (key: string): any | undefined => {
  const item = localStorage.getItem(key);

  try {
    if (item) {
      return JSON.parse(item);
    } else return undefined;
  } catch (error) {
    return undefined;
  }
};

export const setItemToStorage = (key: string, newItem: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(newItem));
    return true;
  } catch (error) {
    return false;
  }
};

export const removeItemFromStorage = (label: string): void => {
  localStorage.removeItem(label);
};

// According to Django auth User model
// https://docs.djangoproject.com/en/3.1/ref/contrib/auth/#django.contrib.auth.models.User.username
// "150 characters or fewer. Usernames may contain alphanumeric, _, @, +, . and - characters."
export const validateUsername = (username: string): boolean => {
  const re = /^(\w|[@_*+-]){1,150}$/;
  return re.test(username);
};

export const formatTime = (time: number): string => {
  const t = time / 1000;
  const min = Math.floor(t / 60);
  const sec = Math.floor(t % 60);
  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
};

export const formatMinToHour = (n: number): string => {
  const min = Math.floor(n % 60);
  const h = Math.floor(n / 60);
  return `${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
};

interface Id {
  id: string | number;
}

export function removeFromArray<T extends Id>(arr: T[], id: T["id"]) {
  return arr.filter((item) => id !== item.id);
}
export function replaceFromArray<T extends Id>(arr: T[], item: T) {
  const i = arr.findIndex((old) => old.id === item.id);
  if (i >= 0) {
    arr[i] = item;
    return [...arr];
  }
  throw Error("Item doesn't exist in in the Array.");
}
export function updateItemInArray<T extends Id>(
  arr: T[],
  id: T["id"],
  updater: (arg: T) => T
) {
  const i = arr.findIndex((item) => item.id === id);
  if (i >= 0) {
    arr[i] = updater(arr[i]);
    return [...arr];
  }
  throw Error("Item doesn't exist in in the Array.");
}

const monthSym = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function monthDateFormat(d: Date) {
  return `${monthSym[d.getMonth()]} (${d.getFullYear()})`;
}

export function compDate(d1: Date | string, d2: Date | string) {
  const t1 = new Date(d1).getTime();
  const t2 = new Date(d2).getTime();
  return t1 > t2 ? 1 : t1 === t2 ? 0 : -1;
}

export const isToday = (d?: string) => {
  if (!d) return false;
  const now = new Date();
  const date = new Date(d);
  return now.toLocaleDateString() === date.toLocaleDateString();
};

export const isSameMonth = (d1?: string, d2?: string) => {
  if (!d1 || !d2) return false;
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

export const divByN = (i: number, n: number) => i % n === 0;

export const getDaysInMonth = (m: number, y: number) => {
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (m === 1 && divByN(y, 4) && divByN(y, 100) && divByN(y, 400)) return 29;
  else return months[m % months.length];
};

export const pushNotifications = (messege: string) => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    return;
  }

  // Check whether notification permissions have already been granted
  if (Notification?.permission === "granted") {
    new Notification(messege);
  }
};

export const requestNotificationPermission = async () => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    return;
  }
  if (Notification?.permission !== "denied") {
    const permission = await Notification?.requestPermission();
    return permission === "granted";
  }
};

export const isNotificationAllowed = () => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    return false;
  } else {
    return Notification?.permission === "granted";
  }
};
