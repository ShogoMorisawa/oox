"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Globe, LogIn, Info, Menu, X } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "LAB (HOME)", href: "/", icon: Home },
  { label: "WORLD", href: "/world", icon: Globe },
  { label: "LOGIN", href: "/login", icon: LogIn, disabled: true }, // 将来用
  { label: "ABOUT", href: "/about", icon: Info, disabled: true }, // 将来用
];

export default function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // ページ遷移したらメニューを閉じる
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }, [pathname]);

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col items-end pointer-events-none">
      {/* pointer-events-none にしているのは、メニュー以外の透明部分をクリック可能にするため。
        ボタンとメニュー本体には pointer-events-auto をつけます。
      */}

      {/* トリガーボタン（気泡） */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/20 text-sky-900 shadow-lg backdrop-blur-md transition-colors hover:bg-white/40 active:scale-95"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 背景のゆらぎアニメーション */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-200/30 to-purple-200/30 opacity-50"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* アイコンの切り替え */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* 展開するメニューパネル */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 12, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-2 shadow-xl backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                if (item.disabled) {
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed"
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      <span className="ml-auto text-[10px] uppercase tracking-wider opacity-60">
                        Soon
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-white/60"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-white/80 shadow-sm"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? "text-sky-600" : "text-slate-500"}
                      />
                      <span className={isActive ? "text-sky-900" : ""}>
                        {item.label}
                      </span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute right-3 h-2 w-2 rounded-full bg-sky-500"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
