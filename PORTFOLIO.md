# GitHub Copilot 實戰工作坊待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。它以簡潔的介面協助使用者建立今日任務、追蹤完成狀態，並將清單保存在瀏覽器中，適合作為前端實作與 AI 輔助開發流程的練習成果。

## 線上展示

[開啟 GitHub Pages 展示](https://fadischen.github.io/Copilot-Workshop/)

## 功能

- 新增待辦事項，並自動忽略輸入前後的空白內容。
- 將待辦事項標記為已完成或未完成。
- 刪除單一待辦事項。
- 顯示目前未完成的待辦事項數量。
- 顯示沒有待辦事項時的空清單提示。
- 一次清除所有已完成的待辦事項，操作前會顯示確認提示。
- 使用瀏覽器 `localStorage` 保存待辦清單，重新整理頁面後仍可保留資料。
- 支援鍵盤與螢幕閱讀器使用的基本無障礙標示。
- 依照使用者的系統偏好提供明暗色彩樣式，並支援響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發。
- 不使用前端框架、第三方套件或外部 CDN。
- 透過瀏覽器 `localStorage` 保存待辦資料。
- 直接以靜態檔案方式執行，不需要後端服務或建置工具。

## 開發方式

本專案在 GitHub Copilot 實戰工作坊中，結合 GitHub Copilot Agent Mode、MCP 與 `.github/prompts` 的 agentic workflow 完成。Agent Mode 協助理解需求、檢查程式碼並執行修改；MCP 用於串接 GitHub 工作流程，例如讀取 Issue、建立分支與準備 Pull Request；`.github/prompts` 則將處理 Issue 的步驟整理成可重複使用的任務指引，讓需求理解、修改、驗證與提交流程更加一致。

## 我學到什麼

- 如何使用原生 JavaScript 管理表單、事件與動態 DOM 內容。
- 如何使用 `localStorage` 保存前端應用程式的使用者資料。
- 如何透過 GitHub Copilot Agent Mode 分解需求、定位問題並完成修改。
- 如何使用 MCP 與提示檔案串接 GitHub Issue 及 agentic workflow。
- 如何在不依賴框架與套件的前提下，維持介面、互動與可維護性。