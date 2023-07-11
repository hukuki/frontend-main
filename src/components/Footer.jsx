import { Container } from './Container';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16 flex flex-col items-center">
          <Logo className="mx-auto h-10 w-auto text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-900" />

          <nav className="mt-10 text-sm">
            <div className="-my-1 flex justify-center items-center gap-x-6">
              <NavLink href="/">Features</NavLink>
              <NavLink href="/">Search</NavLink>
              <NavLink href="/">Register</NavLink>
            </div>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
