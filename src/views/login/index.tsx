import { Navigation } from "../../components/Navigation";

export function Login() {
    const menu: { label: string; link: string; }[] = [];
  return (
    <div>
     <Navigation menuItems={menu}/>
      Login screen
    </div>
  );
}
