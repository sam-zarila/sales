import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

enum MenuState {
  CLOSED,
  OPEN,
  BACK,
}

const baseMenuItems = ['IPHONE-ACCESSORIES','JERSEY CENTER','HELP', 'TERMS', 'PRIVACY', 'ABOUT', ];

const MainMenu = ({ isBackVisible, onBack }: { isBackVisible: boolean; onBack: () => void }) => {
  const pathname = usePathname() ?? '';
  const defaultMenuState =
    isBackVisible || pathname.startsWith('/a/') ? MenuState.BACK : MenuState.CLOSED;

  const [menuState, setMenuState] = useState<MenuState>(defaultMenuState);

  useEffect(() => {
    setMenuState(isBackVisible ? MenuState.BACK : MenuState.CLOSED);
  }, [isBackVisible]);

  const handleClick = () => {
    switch (menuState) {
      case MenuState.CLOSED:
        setMenuState(MenuState.OPEN);
        break;
      case MenuState.OPEN:
        setMenuState(MenuState.CLOSED);
        break;
      case MenuState.BACK:
        onBack();
        break;
    }
  };

  // Replace "IPHONE-ACCESSORIES" with "SNAPBACKS" when on the iPhone Accessories page
  const modifiedMenuItems = baseMenuItems.map((item) =>
    pathname === '/iphone-accessories' && item === 'IPHONE-ACCESSORIES'
      ? 'SNAPBACKS'
      : item
  );

  const filteredMenuItems = modifiedMenuItems.filter(
    (item) => `/${item.toLowerCase()}` !== pathname
  );

  return (
    <div className="relative flex items-center">
      <button
        className="p-2 z-20 relative size-12 flex items-center justify-center"
        onClick={handleClick}
        aria-expanded={menuState === MenuState.OPEN}
        aria-label={menuState === MenuState.BACK ? 'Back' : 'Menu'}
      >
        <span className="sr-only">
          {menuState === MenuState.BACK ? 'Back' : 'Menu'}
        </span>
        <div className="size-4 relative flex items-center justify-center">
          <motion.span
            className="absolute left-0 top-[4px] w-4 h-[2px] bg-black origin-center"
            initial={menuState === MenuState.CLOSED ? 'closed' : 'open'}
            animate={menuState === MenuState.OPEN ? 'open' : 'closed'}
            transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
          />
          <motion.span
            className="absolute left-0 top-[12px] w-4 h-[2px] bg-black origin-center"
            initial={menuState === MenuState.CLOSED ? 'closed' : 'open'}
            animate={menuState === MenuState.OPEN ? 'open' : 'closed'}
            transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
          />
        </div>
      </button>

      <AnimatePresence>
        {menuState === MenuState.OPEN && (
          <motion.nav
            id="main-menu"
            className="absolute left-1/2 top-[20%] -translate-y-1/2 ml-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ul className="flex items-center space-x-2">
              {filteredMenuItems.map((item, index) => (
                <motion.li
                  key={item}
                  className={`bg-white px-3 py-1 rounded ${
                    item === 'PRIVACY' ? 'hidden sm:block' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm font-mono hover:opacity-70 transition-opacity whitespace-nowrap"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainMenu;
