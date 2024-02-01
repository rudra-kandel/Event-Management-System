import '@styles/navbar.css';
const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Yoga Packages</a>
                <ul className="p-2">
                  <li>
                    <a>Yoga Retreats</a>
                    <ul className="p-2">
                      <li>
                        <a>Yoga Retreats</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">ShantiYoga</a>
        </div>

        <div className="navbar hidden lg:flex lg:basis-[70%] ">
          <ul className="menu menu-horizontal px-1 flex justify-between w-[100%] pr-[2rem]">
            <li>
              <a>Home</a>
            </li>

            <div className="dropdown dropdown-hover bg-white">
              <div tabIndex={0} role="button" className="btn m-1">
                YOGA PACKAGES
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="dropmenu">
                  <a href="">Yoga Teacher Trainings In Nepal</a>
                  <div className="shadow-lg bg-white dropitem p-0 w-[15rem] rounded-xl">
                    <ul>
                      <li>
                        <a>Singing Bowl Trainings</a>
                      </li>
                      <li>
                        <a>Reiki Training Courses In Nepal</a>
                      </li>
                      <li>
                        <a>Aayurveda & Panchakarma</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a>Singing Bowl Trainings</a>
                </li>
                <li>
                  <a>Reiki Training Courses In Nepal</a>
                </li>
                <li>
                  <a>Aayurveda & Panchakarma</a>
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                TRAINING PACKAGE
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="dropmenu">
                  <a href="">Yoga Teacher Trainings In Nepal</a>

                  <div className="shadow-lg bg-white dropitem p-0 w-[15rem] rounded-xl">
                    <ul>
                      <li>
                        <a>Singing Bowl Trainings</a>
                      </li>
                      <li>
                        <a>Reiki Training Courses In Nepal</a>
                      </li>
                      <li>
                        <a>Aayurveda & Panchakarma</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a>Singing Bowl Trainings</a>
                </li>
                <li>
                  <a>Reiki Training Courses In Nepal</a>
                </li>
                <li>
                  <a>Aayurveda & Panchakarma</a>
                </li>
              </ul>
            </div>

            <li>
              <a>Blog</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
