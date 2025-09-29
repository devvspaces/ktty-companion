import os

# Adjust these to point to your downloaded folders
desktop_path = "./animations/desktop"
mobile_path = "./animations/mobile"

def list_videos(path):
    for root, dirs, files in os.walk(path):
        # Get the relative subfolder (e.g. "normal", "rare", "ultra")
        tier = os.path.relpath(root, path)
        for f in files:
            if f.lower().endswith(".mp4"):
                print(f"{tier:10} -> {f}")

print("=== Desktop Videos ===")
list_videos(desktop_path)

print("\n=== Mobile Videos ===")
list_videos(mobile_path)
