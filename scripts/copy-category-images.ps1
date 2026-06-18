# Copies user category photos from Cursor assets into public/images/categories/
$dest = Join-Path $PSScriptRoot "public\images\categories"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$assets = "C:\Users\CAPTAIN\.cursor\projects\c-Users-CAPTAIN-OneDrive-Desktop-scc-project-smartcoolcare-backend-render\assets"

$map = @{
  "compressors.jpg"     = "c__Users_CAPTAIN_AppData_Roaming_Cursor_User_workspaceStorage_1e12712777d142bd980e30e73b7d07db_images_5765d7ec-6713-4931-9977-43e53b7ed5d2-ef579315-d901-47f2-966e-8d274a9989b5.png"
  "capacitors.jpg"      = "c__Users_CAPTAIN_AppData_Roaming_Cursor_User_workspaceStorage_1e12712777d142bd980e30e73b7d07db_images_WhatsApp_Image_2026-06-18_at_1.56.50_PM__2_-3421d8f0-1413-4726-8d41-12d0fe695114.png"
  "air-conditioner.jpg" = "c__Users_CAPTAIN_AppData_Roaming_Cursor_User_workspaceStorage_1e12712777d142bd980e30e73b7d07db_images_2a178d3d-0ccb-495c-b8eb-ab770086c4a3-fb14df41-d5c5-46e5-877f-b9bfbcb6f2ee.png"
  "remotes.jpg"         = "c__Users_CAPTAIN_AppData_Roaming_Cursor_User_workspaceStorage_1e12712777d142bd980e30e73b7d07db_images_f80a0d90-10e7-42f1-a3e0-946e4be267d6-10280ec9-42a8-4eae-9db9-2a5063999114.png"
  "refrigerant.jpg"     = "c__Users_CAPTAIN_AppData_Roaming_Cursor_User_workspaceStorage_1e12712777d142bd980e30e73b7d07db_images_fa69186d-9151-4ecf-a33d-1190185c6783-44e8edb3-ad60-4293-9bf7-06cf6a1c0124.png"
  "copper.jpg"          = "c__Users_CAPTAIN_AppData_Roaming_Cursor_User_workspaceStorage_1e12712777d142bd980e30e73b7d07db_images_af578c51-2019-4028-a7de-36fec8ad0fe1-5112c47b-2bb8-4c04-ab0a-c1506e918ab3.png"
}

foreach ($name in $map.Keys) {
  $src = Join-Path $assets $map[$name]
  $out = Join-Path $dest $name
  if (Test-Path $src) {
    Copy-Item $src $out -Force
    Write-Host "OK  $name"
  } else {
    Write-Host "SKIP $name (source missing — re-attach photo in chat or drop file at $out)"
  }
}
