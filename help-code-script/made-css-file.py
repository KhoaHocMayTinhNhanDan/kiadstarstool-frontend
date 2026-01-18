import os

def create_assets_styles():
    # Cấu trúc chi tiết dựa trên yêu cầu của bạn
    structure = {
        "assets/styles/atoms": [
            "_avatar.css", "_badge.css", "_button.css", "_chip.css", 
            "_icon.css", "_input.css", "_loading-spinner.css", "_progress.css"
        ],
        "assets/styles/molecules": [
            "_card.css", "_filter-group.css", "_form-group.css", 
            "_list-item.css", "_search-bar.css", "_stat-card.css"
        ],
        "assets/styles/organisms": [
            "_app-header.css", "_data-table.css", "_form.css", 
            "_modal.css", "_sidebar.css", "_table.css", "_user-profile.css"
        ],
        "assets/styles/feedback": [
            "_alert.css", "_empty-state.css", "_loading-overlay.css", 
            "_skeleton.css", "_toast.css", "_tooltip.css"
        ],
        "assets/styles/navigation": [
            "_breadcrumb.css", "_drawer.css", "_nav-menu.css", 
            "_pagination.css", "_stepper.css", "_tabs.css"
        ],
        "assets/styles/layouts": [
            "_auth.css", "_blank.css", "_centered.css", "_dashboard.css", "_main.css"
        ],
        "assets/styles/pages": [
            "_attendance.css", "_auth.css", "_dashboard.css", 
            "_error.css", "_students.css", "_users.css"
        ],
        "assets/styles/base": [
            "_colors.css", "_reset.css", "_spacing.css", "_typography.css"
        ],
        "assets/styles/themes": [
            "_dark.css", "_light.css", "_variables.css"
        ],
        "assets/styles/utilities": [
            "_display.css", "_flexbox.css", "_spacing.css"
        ]
    }

    # 1. Tạo các thư mục và file partials
    print("🚀 Đang khởi tạo cấu trúc assets/styles/...")
    main_imports = []

    for folder, files in structure.items():
        os.makedirs(folder, exist_ok=True)
        # Lấy tên thư mục cuối (ví dụ: 'atoms') để tạo comment
        category = folder.split('/')[-1]
        main_imports.append(f"/* --- {category.upper()} --- */")
        
        for file in files:
            file_path = os.path.join(folder, file)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(f"/* Style for {file} */\n")
            
            # Chuẩn bị dòng import cho main.css
            # Lưu ý: Bỏ dấu '_' và đuôi '.css' nếu dùng SASS, 
            # nhưng ở đây ta giữ nguyên theo chuẩn CSS thuần.
            rel_path = f"{category}/{file}"
            main_imports.append(f"@import '{rel_path}';")
        
        main_imports.append("") # Dòng trống ngăn cách các nhóm

    # 2. Tạo file main.css (Entry point)
    main_css_path = "assets/styles/main.css"
    with open(main_css_path, "w", encoding="utf-8") as f:
        f.write("/* Main Entry Point */\n\n")
        f.write("\n".join(main_imports))

    # 3. Tạo file README.md với nội dung cây thư mục bạn đã cung cấp
    readme_content = """assets/styles/
├── atoms/                  # Atom Styles
├── molecules/              # Molecule Styles
├── organisms/              # Organism Styles
├── feedback/               # Feedback Styles
├── navigation/             # Navigation Styles
├── layouts/                # Layout Styles
├── pages/                  # Page-specific Styles
├── base/                   # Base Styles
├── themes/                 # Themes
├── utilities/              # Utility Classes
└── main.css                # Main entry point
"""
    with open("assets/styles/README.md", "w", encoding="utf-8") as f:
        f.write(readme_content)

    print(f"✅ Thành công! Đã tạo toàn bộ cấu trúc và file main.css tại: {os.path.abspath('assets/styles/')}")

if __name__ == "__main__":
    create_assets_styles()