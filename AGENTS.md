# Project Guidelines & Agent Instructions

## Mandatory Commit & Push Policy
- **Always Commit and Push Together**: For every user request or code modification, commit all changes and immediately push them to the remote GitHub repository.
- **Dual-Branch Synchronization**: Always push to both `main` and `gh-pages` so that GitHub Pages deploys seamlessly:
  ```powershell
  & "C:\Users\vinod\AppData\Local\Programs\Git\cmd\git.exe" push origin main
  & "C:\Users\vinod\AppData\Local\Programs\Git\cmd\git.exe" push origin main:gh-pages
  ```
- **Commit Formatting**: Use clear, concise commit messages following standard conventions (`feat: ...`, `fix: ...`, `content: ...`, etc.).
- **Unattended Execution**: Always utilize the pre-configured SSH connection (`git@github.com:Auroderma/AuraDerma.git`) with the local key in `~/.ssh/id_ed25519`.
