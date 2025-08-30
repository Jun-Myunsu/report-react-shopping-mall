import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../slices/authSlice";

export default function Header() {
  const cartCount = useAppSelector((s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0)
  );
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-black tracking-tight">
          SHOP
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z"
              />
            </svg>
            BAG
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              onClick={async () => {
                await dispatch(logout());
                nav("/");
              }}
              title={user.email ?? "로그아웃"}
            >
              SIGN OUT
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              title="로그인"
            >
              SIGN IN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
