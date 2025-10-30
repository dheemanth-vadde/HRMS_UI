// src/config/staticPermissions.ts
// Static permission payload (what you asked for)
export const staticRolePermissions = {
  RoleId: 1,
  roleName: "super admin",
  screens: {
    "dashboard": { all: false, view: true, create: false, edit: false, delete: false },

    "superadmin:organization": { all: false, view: true, create: false, edit: false, delete: false },
    "superadmin:organization:info": { all: false, view: true, create: false, edit: false, delete: false },
    "superadmin:organization:units": { all: false, view: true, create: false, edit: false, delete: false },
    "superadmin:organization:departments": { all: false, view: true, create: false, edit: false, delete: false },
    "superadmin:organization:announcements": { all: false, view: true, create: false, edit: false, delete: false },

    "recruitment:job-postings": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:candidate-shortlist": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:interviews": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:bulk-upload": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:job-creation": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:candidate-assign": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:master:skill": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:master:location": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:master:job-grade": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:master:position": { all: false, view: true, create: false, edit: false, delete: false },
    "recruitment:master:department": { all: false, view: true, create: false, edit: false, delete: false },
    
    
    "superadmin:access-control": { all: false, view: true, create: false, edit: false, delete: false },
    "superadmin:access-control:roles": { all: false, view: true, create: false, edit: false, delete: false },
    "superadmin:access-control:permissions": { all: false, view: true, create: false, edit: false, delete: false },

    "employees": { all: false, view: true, create: false, edit: false, delete: false },

    "attendance": { all: false, view: false, create: false, edit: false, delete: false },
    "leave": { all: false, view: false, create: false, edit: false, delete: false },
    "profile": { all: false, view: false, create: false, edit: false, delete: false },
    "payroll": { all: false, view: false, create: false, edit: false, delete: false },
    "performance": { all: false, view: false, create: false, edit: false, delete: false },
    "policies": { all: false, view: false, create: false, edit: false, delete: false },
    "grievance": { all: false, view: false, create: false, edit: false, delete: false },
    "exit": { all: false, view: false, create: false, edit: false, delete: false },
    "trips": { all: false, view: false, create: false, edit: false, delete: false },
    "advances": { all: false, view: false, create: false, edit: false, delete: false },
    "receipts": { all: false, view: false, create: false, edit: false, delete: false },
    "expenses": { all: false, view: false, create: false, edit: false, delete: false },

    "hr:recruitment": { all: false, view: false, create: false, edit: false, delete: false },
    "hr:reports": { all: false, view: false, create: false, edit: false, delete: false },

    "manager:attendance": { all: false, view: false, create: false, edit: false, delete: false },
    "manager:leave": { all: false, view: false, create: false, edit: false, delete: false },
    "manager:performance": { all: false, view: false, create: false, edit: false, delete: false },
    "manager:recruitment": { all: false, view: false, create: false, edit: false, delete: false },

    "settings:site": { all: false, view: true, create: false, edit: false, delete: false }
  }
};

export type StaticPermissions = typeof staticRolePermissions;
