export function formatCurrency(amount: number, currency: string = 'KES'): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatDate(dateString?: string | Date | null): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateString?: string | Date | null): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusBadgeVariant(status: string): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
    case 'PAID':
      return {
        bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        text: 'text-emerald-300',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-400',
      };
    case 'CONFIRMED':
    case 'ASSIGNED':
    case 'IN_PROGRESS':
      return {
        bg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        text: 'text-indigo-300',
        border: 'border-indigo-500/30',
        dot: 'bg-indigo-400',
      };
    case 'PENDING_REVIEW':
    case 'ASSESSMENT':
    case 'PROCESSING':
      return {
        bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        text: 'text-amber-300',
        border: 'border-amber-500/30',
        dot: 'bg-amber-400',
      };
    case 'REQUESTED':
    case 'PENDING':
      return {
        bg: 'bg-komfo-500/15 text-komfo-300 border-komfo-500/30',
        text: 'text-komfo-300',
        dot: 'bg-komfo-400',
        border: 'border-komfo-500/30',
      };
    case 'CANCELLED':
    case 'FAILED':
      return {
        bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        text: 'text-rose-300',
        border: 'border-rose-500/30',
        dot: 'bg-rose-400',
      };
    default:
      return {
        bg: 'bg-white/10 text-slate-300 border-white/15',
        text: 'text-slate-300',
        border: 'border-white/15',
        dot: 'bg-slate-400',
      };
  }
}
