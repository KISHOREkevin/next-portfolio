"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { fileSystemTree, VirtualFile } from "@/data/filesystem";
import { useWindowManager } from "@/components/os/WindowManager";

const glyph = (icon: PhosphorIconData) =>
  function Glyph({ className }: { className?: string }) {
    return <Icon icon={icon} className={className} />;
  };

const Folder = glyph(phosphorIcons.folderOpen);
const FileText = glyph(phosphorIcons.fileText);
const FileCode = glyph(phosphorIcons.code);
const File = glyph(phosphorIcons.fileText);
const ExternalLink = glyph(phosphorIcons.linkSimple);
const Info = glyph(phosphorIcons.info);
const HardDrive = glyph(phosphorIcons.hardDrive);

export function FileExplorerApp() {
  const { openApp } = useWindowManager();
  const [currentPath, setCurrentPath] = useState<string>("/home/kishore");
  const [selectedFile, setSelectedFile] = useState<VirtualFile | null>(null);

  const findFolderByPath = (path: string): VirtualFile[] => {
    if (path === "/home/kishore") {
      const userFolder = fileSystemTree[0]?.children?.[0];
      return userFolder?.children || [];
    }
    if (path === "/home/kishore/projects") {
      const userFolder = fileSystemTree[0]?.children?.[0];
      const projFolder = userFolder?.children?.find((f) => f.name === "projects");
      return projFolder?.children || [];
    }
    return [];
  };

  const currentFiles = findFolderByPath(currentPath);

  const handleItemClick = (file: VirtualFile) => {
    if (file.type === "directory") {
      setCurrentPath(file.path);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleOpenApp = (appId?: string) => {
    if (appId) {
      openApp(appId);
    }
  };

  const getFileIcon = (file: VirtualFile) => {
    if (file.type === "directory") {
      return <Folder className="w-5 h-5 text-[var(--accent)]" />;
    }
    if (file.extension === "md") {
      return <FileText className="w-5 h-5 text-[var(--accent)]" />;
    }
    if (file.extension === "json" || file.extension === "ts") {
      return <FileCode className="w-5 h-5 text-[var(--accent)]" />;
    }
    return <File className="w-5 h-5 text-[var(--foreground-muted)]" />;
  };

  return (
    <div className="app-workspace h-full flex flex-col font-mono text-xs text-[var(--foreground)] select-text">
      {/* Header */}
      <div className="pb-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            Archive / Filesystem
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)] m-0 leading-tight">
            File Explorer
          </h1>
          <p className="text-xs text-[var(--foreground-muted)] m-0 mt-0.5">
            Browse the public portfolio filesystem & project documentation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
            onClick={() => setCurrentPath("/home/kishore")}
          >
            <HardDrive className="w-3.5 h-3.5" />
            Home
          </button>
          {selectedFile && (
            <button
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
              onClick={() => setSelectedFile(null)}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Breadcrumb Path Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-md my-3 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto text-[var(--foreground-muted)]">
          <HardDrive className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <button
            onClick={() => {
              setCurrentPath("/home/kishore");
              setSelectedFile(null);
            }}
            className="hover:text-[var(--foreground)] font-medium transition-colors cursor-pointer"
          >
            /home/kishore
          </button>
          {currentPath !== "/home/kishore" && (
            <>
              <span className="text-[var(--border-strong)]">/</span>
              <span className="text-[var(--foreground)] font-semibold">
                {currentPath.replace("/home/kishore/", "")}
              </span>
            </>
          )}
        </div>

        {currentPath !== "/home/kishore" && (
          <button
            onClick={() => setCurrentPath("/home/kishore")}
            className="text-[11px] text-[var(--accent)] hover:underline px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] cursor-pointer"
          >
            ↑ Parent Dir
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-3 pb-4 overflow-hidden">
        {/* File Browser Grid */}
        <div className="md:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3.5 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {currentFiles.map((file) => {
              const isSelected = selectedFile?.id === file.id;

              return (
                <div
                  key={file.id}
                  onClick={() => handleItemClick(file)}
                  onDoubleClick={() => {
                    if (file.type === "directory") {
                      setCurrentPath(file.path);
                      setSelectedFile(null);
                    } else if (file.openAppId) {
                      openApp(file.openAppId);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-sm"
                      : "bg-[var(--surface-elevated)]/50 border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
                  }`}
                >
                  <div className="mb-2">{getFileIcon(file)}</div>
                  <span className="text-xs font-medium text-[var(--foreground)] truncate w-full">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-[var(--foreground-muted)] mt-0.5">
                    {file.size}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* File Preview Pane */}
        <div className="md:col-span-5 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 flex flex-col justify-between shadow-sm overflow-hidden">
          {selectedFile ? (
            <div className="space-y-3 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  {getFileIcon(selectedFile)}
                  <span className="font-semibold text-xs text-[var(--foreground)] truncate">
                    {selectedFile.name}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--foreground-muted)] shrink-0">
                  {selectedFile.size}
                </span>
              </div>

              {/* Preview Content */}
              <div className="flex-1 bg-[var(--surface-elevated)] rounded-md p-3 border border-[var(--border)] text-xs text-[var(--foreground)] overflow-y-auto whitespace-pre-wrap font-mono leading-relaxed">
                {selectedFile.content || "No preview available for binary file."}
              </div>

              {/* Action Button */}
              {selectedFile.openAppId && (
                <button
                  onClick={() => handleOpenApp(selectedFile.openAppId)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold transition-all mt-2 text-xs shadow-sm cursor-pointer shrink-0"
                >
                  <span>Open in {selectedFile.openAppId.toUpperCase()}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[var(--foreground-muted)] space-y-2">
              <Info className="w-8 h-8 opacity-40 text-[var(--accent)]" />
              <div className="text-xs text-[var(--foreground)]">Select a file to inspect its content</div>
              <div className="text-[10px] text-[var(--foreground-muted)]">
                Double-click directories or files to open
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
