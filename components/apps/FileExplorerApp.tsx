"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { phosphorIcons, type PhosphorIconData } from "@/lib/icons/phosphor";
import { fileSystemTree, VirtualFile } from "@/data/filesystem";
import { useWindowManager } from "@/components/os/WindowManager";

const glyph = (icon: PhosphorIconData) => function Glyph({ className }: { className?: string }) { return <Icon icon={icon} className={className} />; };
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
      return <Folder className="w-5 h-5 text-[#89b4fa]" />;
    }
    if (file.extension === "md") {
      return <FileText className="w-5 h-5 text-[#a6e3a1]" />;
    }
    if (file.extension === "json" || file.extension === "ts") {
      return <FileCode className="w-5 h-5 text-[#cba6f7]" />;
    }
    if (file.extension === "pdf") {
      return <File className="w-5 h-5 text-[#fab387]" />;
    }
    return <File className="w-5 h-5 text-[#a6adc8]" />;
  };

  return (
    <div className="app-workspace h-full flex flex-col font-mono text-xs text-[#cdd6f4] select-text">
      <div className="app-toolbar"><div><div className="app-kicker">Archive / filesystem</div><h1>File Explorer</h1><p>Browse the public portfolio workspace.</p></div><div className="app-toolbar-actions"><button className="app-control" onClick={() => setCurrentPath("/home/kishore")}><HardDrive className="w-3.5 h-3.5"/>Home</button><button className="app-control" onClick={() => setSelectedFile(null)}>Clear selection</button></div></div>
      {/* Breadcrumb Path Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#181825] border border-[#313244] rounded-md mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-[#a6adc8]">
          <HardDrive className="w-4 h-4 text-[#89b4fa] shrink-0" />
          <button
            onClick={() => {
              setCurrentPath("/home/kishore");
              setSelectedFile(null);
            }}
            className="hover:text-[#cdd6f4] font-medium transition-colors"
          >
            /home/kishore
          </button>
          {currentPath !== "/home/kishore" && (
            <>
              <span className="text-[#45475a]">/</span>
              <span className="text-[#cdd6f4]">
                {currentPath.replace("/home/kishore/", "")}
              </span>
            </>
          )}
        </div>

        {currentPath !== "/home/kishore" && (
          <button
            onClick={() => setCurrentPath("/home/kishore")}
            className="text-[11px] text-[#89b4fa] hover:underline px-2 py-0.5 rounded bg-[#11111b] border border-[#313244]"
          >
            ↑ Parent Dir
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[340px]">
        {/* File Browser Grid */}
        <div className="md:col-span-7 bg-[#181825] border border-[#313244] rounded-lg p-3.5 overflow-y-auto">
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
                  className={`flex flex-col items-center justify-center p-3 rounded-md border text-center transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#1e1e2e] border-[#89b4fa] shadow-sm"
                      : "bg-[#11111b] border-[#313244] hover:border-[#45475a] hover:bg-[#1e1e2e]/50"
                  }`}
                >
                  <div className="mb-2">{getFileIcon(file)}</div>
                  <span className="text-[11px] font-medium text-[#cdd6f4] truncate w-full">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-[#6c7086] mt-0.5">
                    {file.size}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* File Preview Pane */}
        <div className="md:col-span-5 bg-[#181825] border border-[#313244] rounded-lg p-4 flex flex-col justify-between shadow-sm">
          {selectedFile ? (
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-[#313244] pb-2.5">
                <div className="flex items-center gap-2">
                  {getFileIcon(selectedFile)}
                  <span className="font-semibold text-[#cdd6f4] truncate max-w-[170px]">
                    {selectedFile.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#6c7086]">
                  {selectedFile.size}
                </span>
              </div>

              {/* Preview Content */}
              <div className="flex-1 bg-[#11111b] rounded-md p-3 border border-[#313244] text-[11px] text-[#bac2de] overflow-y-auto whitespace-pre-wrap font-mono max-h-[220px] leading-relaxed">
                {selectedFile.content || "No preview available for binary file."}
              </div>

              {/* Action Button */}
              {selectedFile.openAppId && (
                <button
                  onClick={() => handleOpenApp(selectedFile.openAppId)}
                  className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-[#89b4fa] hover:bg-[#b4befe] text-[#11111b] font-medium transition-colors mt-2 text-xs"
                >
                  <span>Open in {selectedFile.openAppId.toUpperCase()}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6c7086] space-y-2">
              <Info className="w-8 h-8 opacity-40 text-[#89b4fa]" />
              <div className="text-xs text-[#a6adc8]">Select a file to inspect its content</div>
              <div className="text-[10px]">
                Double-click directories or files to open
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
