import os

def create_structure():
    # Nội dung file README dựa trên yêu cầu của bạn
    readme_content = """# Template Structure (Atomic Design)

templates/
├── atoms/                   # Các phần tử cơ bản nhất
│   ├── button.template.js
│   ├── input.template.js
│   ├── avatar.template.js
│   ├── badge.template.js
│   ├── icon.template.js
│   ├── chip.template.js
│   └── progress.template.js
│
├── molecules/               # Nhóm các atoms
│   ├── form-group.template.js     # Label + Input + Error
│   ├── search-bar.template.js     # Input + Button
│   ├── card.template.js           # Container + content
│   ├── list-item.template.js      # Icon + Text + Action
│   ├── stat-card.template.js      # Icon + Number + Label
│   └── filter-group.template.js   # Multiple filters
│
├── organisms/               # Nhóm các molecules
│   ├── modal.template.js          # Modal với header, body, footer
│   ├── sidebar.template.js        # Logo + Menu + User info
│   ├── navbar.template.js         # Logo + Search + User menu
│   ├── data-table.template.js     # Table + Pagination + Toolbar
│   ├── form.template.js           # Multiple form groups
│   └── user-profile.template.js   # Avatar + Info + Actions
│
├── feedback/                # Components phản hồi
│   ├── toast.template.js
│   ├── alert.template.js
│   ├── skeleton.template.js
│   ├── empty-state.template.js
│   ├── loading.template.js
│   └── tooltip.template.js
│
├── navigation/              # Components điều hướng
│   ├── breadcrumb.template.js
│   ├── pagination.template.js
│   ├── tabs.template.js
│   ├── stepper.template.js
│   └── drawer.template.js
│
├── layouts/                 # Layout templates
│   ├── auth.template.js           # Layout đăng nhập
│   ├── main.template.js           # Layout chính (sidebar + content)
│   ├── dashboard.template.js      # Layout dashboard đặc thù
│   ├── centered.template.js       # Layout căn giữa
│   └── blank.template.js          # Layout trống
│
└── pages/                  # Page templates
    ├── auth/
    │   ├── login.template.js
    │   └── register.template.js
    ├── dashboard/
    │   ├── overview.template.js
    │   └── analytics.template.js
    ├── students/
    │   ├── list.template.js
    │   ├── detail.template.js
    │   └── form.template.js
    ├── users/
    │   ├── list.template.js
    │   ├── profile.template.js
    │   └── settings.template.js
    ├── attendance/
    │   ├── mark.template.js
    │   ├── report.template.js
    │   └── calendar.template.js
    └── error/
        ├── 404.template.js
        ├── 403.template.js
        └── 500.template.js
"""

    # Định nghĩa cấu trúc (Thư mục: Danh sách file)
    structure = {
        "templates/atoms": [
            "button.template.js", "input.template.js", "avatar.template.js",
            "badge.template.js", "icon.template.js", "chip.template.js", "progress.template.js"
        ],
        "templates/molecules": [
            "form-group.template.js", "search-bar.template.js", "card.template.js",
            "list-item.template.js", "stat-card.template.js", "filter-group.template.js"
        ],
        "templates/organisms": [
            "modal.template.js", "sidebar.template.js", "navbar.template.js",
            "data-table.template.js", "form.template.js", "user-profile.template.js"
        ],
        "templates/feedback": [
            "toast.template.js", "alert.template.js", "skeleton.template.js",
            "empty-state.template.js", "loading.template.js", "tooltip.template.js"
        ],
        "templates/navigation": [
            "breadcrumb.template.js", "pagination.template.js", "tabs.template.js",
            "stepper.template.js", "drawer.template.js"
        ],
        "templates/layouts": [
            "auth.template.js", "main.template.js", "dashboard.template.js",
            "centered.template.js", "blank.template.js"
        ],
        "templates/pages/auth": ["login.template.js", "register.template.js"],
        "templates/pages/dashboard": ["overview.template.js", "analytics.template.js"],
        "templates/pages/students": ["list.template.js", "detail.template.js", "form.template.js"],
        "templates/pages/users": ["list.template.js", "profile.template.js", "settings.template.js"],
        "templates/pages/attendance": ["mark.template.js", "report.template.js", "calendar.template.js"],
        "templates/pages/error": ["404.template.js", "403.template.js", "500.template.js"],
    }

    # Tạo thư mục và file
    for folder, files in structure.items():
        os.makedirs(folder, exist_ok=True)
        for file in files:
            path = os.path.join(folder, file)
            with open(path, "w", encoding="utf-8") as f:
                f.write(f"")
    
    # Tạo file README.md
    with open("templates/README.md", "w", encoding="utf-8") as f:
        f.write(readme_content)

    print("✅ Đã tạo xong cấu trúc thư mục thành công tại './templates/'")

if __name__ == "__main__":
    create_structure()