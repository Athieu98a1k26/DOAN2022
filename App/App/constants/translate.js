const dontTranslate = false;

export const translatedTexts = {
    'Kiosk.ViewDeviceStatus': 'View Devices Status',
    'Kiosk.ClickOnId': 'Click on ID to access single kiosk management',
    // 'Kiosk.ViewConfigLog': 'View Kiosk Config Log',
    // 'Kiosk.ViewTransaction': 'View Kiosk Transaction',
    'Kiosk.ViewCashStacker': 'View Cash Stacker Status',
    'Kiosk.AllowChangeMaintenance': 'Allow change of maintenance mode',
    'Kiosk.ShutDownKiosk': 'Shut Down Kiosk',
    'Kiosk.RebootKiosk': 'Reboot Kiosk',
    // kiosk management
    'Kiosk.AccessKioskManagement': 'Access Kiosk Management',
    'Kiosk.Access.Config': 'Access Kiosk Configuration',
    'Kiosk.Edit.Info': 'Edit Kiosk information',
    'Kiosk.EditUpdate.Payment': 'Edit/Update Payment mode options and Note acceptable',
    // Audit Trail
    'AuditTrail.View': 'Access Audit Trail',
    // 'AuditTrail.Filter': 'Allow Filters',
    'AuditTrail.Download': 'Allow Downloads',
    'AuditTrail.ViewContent': 'View Audit Trail Single',
    'AuditTrail.ViewCashStacker': 'View Cash Stacker',

    // global config
    'Global.Access.Config': 'Access Global Configuration',
    'Global.EditUpdate.Timeout': 'Edit/Update Timeout setting',
    'Global.EditUpdate.Payment': 'Edit/Update Payment mode options and Note acceptable',
    'Global.EditUpdate.SMS': 'Edit/Update SMS Enrollment Settings',
    'Global.EditUpdate.Levy': 'Edit/Update Levy Settings',
    // Display Management
    'DisplayManagement.Access': 'Access Display Management',
    'DisplayManagement.EditUpdate.General': 'Edit/Update text on General Content',
    'DisplayManagement.EditUpdate.Enquire': 'Edit/Update text on Enquire LevyContent',
    'DisplayManagement.EditUpdate.SMS': 'Edit/Update text on SMS Enrolement Content',
    'DisplayManagement.EditUpdate.Purchase': 'Edit/Update text on Purchase Levy Content',
    // Manage Levies
    'ManagementLevy.Access': 'Access Levies Management',
    'ManagementLevy.AddNew': 'Add New Levy',
    'ManagementLevy.EnableDisable': "Enable/Disable for sale",
    'ManagementLevy.Edit': 'Edit Levy',
    'ManagementLevy.Schedule': 'Schedule Levy',
    // Notification Management
    'Notification.Access': 'Access Notification Management',
    'Notification.EnableDisable': 'Enable/disable Notification',
    'Notification.Edit': "Edit Notification",
    // Downstream Systems
    'Downstream.Access': 'Access Downstream Systems',
    'Downstream.AllowMaintenance': 'Allow Maintenance of Interface Config',
    // User management
    'UserManagement.Access': 'Access User Management',
    // 'UserManagement.Search': 'Search User',
    'UserManagement.AddNew': 'Add New User',
    'UserManagement.ViewUser': 'View User List',
    'UserManagement.EditUser': 'Edit User',
    'UserManagement.EnableDisable': 'Enable/Disable User',
    'UserManagement.Export': 'Export (PDF, CSV, Excel)',
    'UserManagement.EditUserRole': 'Edit User Role',
    'UserManagement.EnableDisableUserRole': 'Enable/Disable User Role',
    // Transaction Listing
    'Transaction.AccessReports': 'Access Cash Cash Collection Report1',
    'Transaction.AccessCashCollection': 'Access Cash Collection Report',
    'Transaction.AccessLevyKioskDetails': 'Access Levy Kiosk Transaction Details (12am - 12am)',
    'Transaction.AccessOutstanding': 'Access Outstanding Transaction Report',
    'Transaction.AccessExceptional': 'Access Exceptional Transaction Report',
    'Transaction.AccessKioskTransactionDetail': 'Access Kiosk Transaction Detail (by Payment Mode)',
    'Transaction.AccessSummaryofSettledCash': 'Access Summary of Settled Cash Transactions Report',
    'Transaction.AccessLevyKioskCreditCard': 'Access Levy Kiosk - Credit Card Transactions Report',

    // 'Transaction.Filter': 'Allow Filters',
    // 'Transaction.Search': 'Allow Search for terms',
    'Transaction.Download': 'Allow Download (PDF, CSV, Excel)',
    'TransactionDetail.AllowResolve': 'Allow Resolve',


    // Management Console
    'ManageConsole.AbleToLogin': 'Able to login on Kiosk management Console',
    'ManageConsole.PrintLast': 'Print Last Transaction Receipt',
    // Collection / Settlement
    'CollectSetlement.Access': 'Access Adhoc Collection / Kiosk Settlement',
    'CollectSetlement.AbleCommenceComplete': 'Able to Commence and complete settlement/collection',
    'CollectSetlement.AblePrint': 'Able to Print Last Slip',
    // Check Status of Devices
    'CheckStatus.ViewCash': 'View Cash Machine',
    'CheckStatus.ViewScanner': 'View Scanner',
    'CheckStatus.ViewPrinter': 'View Printer',
    'CheckStatus.ViewPayment': 'View Payment Terminal',
    'CheckStatus.ViewLEDs': 'View LEDS',
    'CheckStatus.ViewNETs': 'View NETS',
    'CheckStatus.AllowReload': 'Allow reload status',

    // Kiosk Config
    'KioskConfig.AllowChange': 'Allow change of maintenance mode',
    'KioskConfig.ShutDown': 'Shut Down Kiosk',
    'KioskConfig.Reboot': 'Reboot Kiosk',
    'AudittrailConsole.ViewAuditTrails': 'View Audit Trails of this kiosk',
}

export default function translate(text) {
    if (dontTranslate) return text;

    if (translatedTexts[text]) {
        return translatedTexts[text];
    }
    return text;
}