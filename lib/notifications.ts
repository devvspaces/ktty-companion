import toast from 'react-hot-toast';

export interface NotificationOptions {
  duration?: number;
  txHash?: string;
}

/**
 * Show success notification
 */
export function showSuccessNotification(message: string, options?: NotificationOptions) {
  const { duration = 2000, txHash } = options || {};
  
  if (txHash) {
    // Show success with clickable transaction link
    toast.success(
      `${message}`,
      {
        duration: 2000,
        style: {
          background: '#10B981',
          color: '#fff',
          borderRadius: '8px',
          padding: '12px 16px',
          maxWidth: '400px',
          cursor: 'pointer',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      }
    );
  } else {
    // Show simple success message without link
    toast.success(message, {
      duration,
      style: {
        background: '#10B981',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
    });
  }
}

/**
 * Show error notification
 */
export function showErrorNotification(message: string, options?: NotificationOptions) {
  const { duration = 2000 } = options || {};
  
  toast.error(message, {
    duration,
    style: {
      background: '#EF4444',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      maxWidth: '400px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
  });
}

/**
 * Show loading notification
 */
export function showLoadingNotification(message: string): string {
  return toast.loading(message, {
    style: {
      background: '#374151',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#374151',
    },
  });
}

/**
 * Show info notification
 */
export function showInfoNotification(message: string, options?: NotificationOptions) {
  const { duration = 2000 } = options || {};
  
  toast(message, {
    duration,
    icon: 'ℹ️',
    style: {
      background: '#3B82F6',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
    },
  });
}

/**
 * Dismiss notification
 */
export function dismissNotification(id: string) {
  toast.dismiss(id);
}

/**
 * Dismiss all notifications
 */
export function dismissAllNotifications() {
  toast.dismiss();
}

/**
 * Show approval notification
 */
export function showApprovalNotification(stage: 'requesting' | 'pending' | 'success' | 'error', txHash?: string) {
  switch (stage) {
    case 'requesting':
      return showLoadingNotification('Requesting KTTY approval...');
    
    case 'pending':
      return showLoadingNotification('Waiting for approval confirmation...');
    
    case 'success':
      showSuccessNotification('KTTY approval successful! You can now mint.', { txHash });
      break;
    
    case 'error':
      showErrorNotification('KTTY approval failed. Please try again.');
      break;
  }
}

/**
 * Show mint notification
 */
export function showMintNotification(stage: 'simulating' | 'pending' | 'success' | 'error', data?: { quantity?: number; txHash?: string; error?: string }) {
  const { quantity, txHash, error } = data || {};
  
  switch (stage) {
    case 'simulating':
      return showLoadingNotification('Validating transaction...');
    
    case 'pending':
      return showLoadingNotification(`Minting ${quantity || 1} book${quantity !== 1 ? 's' : ''}...`);
    
    case 'success':
      showSuccessNotification(
        `Successfully minted ${quantity || 1} book${quantity !== 1 ? 's' : ''}!`, 
        { txHash, duration: 2000 }
      );
      break;
    
    case 'error':
      showErrorNotification(error || 'Minting failed. Please try again.');
      break;
  }
}

/**
 * Show open books notification
 */
export function showOpenBooksNotification(stage: 'simulating' | 'pending' | 'success' | 'error', data?: { quantity?: number; txHash?: string; error?: string }) {
  const { quantity, txHash, error } = data || {};
  
  switch (stage) {
    case 'simulating':
      return showLoadingNotification('Validating book opening...');
    
    case 'pending':
      return showLoadingNotification(`Opening ${quantity || 1} book${quantity !== 1 ? 's' : ''}...`);
    
    case 'success':
      showSuccessNotification(
        `Successfully opened ${quantity || 1} book${quantity !== 1 ? 's' : ''}! Your rewards are ready.`, 
        { txHash, duration: 3000 }
      );
      break;
    
    case 'error':
      showErrorNotification(error || 'Opening books failed. Please try again.');
      break;
  }
}