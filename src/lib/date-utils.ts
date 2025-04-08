
import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy • h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatShortDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "h:mm a");
  } catch (error) {
    console.error("Error formatting time:", error);
    return dateString;
  }
};
