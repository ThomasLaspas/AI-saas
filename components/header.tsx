import AuthButton from "./AuthButton";
import Link from "next/link";


function Header() {
  return (
    <div className="sm:px-tablet  px-3 sm:py-6  py-4 flex items-center justify-between z-50">
      <Link href="/" className="font-logo sm:text-4xl text-xl text-primary hover:blur-sm">
        Friday
      </Link>


      <AuthButton />



    </div>
  );
}

export default Header;
