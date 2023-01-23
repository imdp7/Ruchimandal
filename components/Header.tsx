import React from 'react';
import TopNavigation from "@cloudscape-design/components/top-navigation";

const TopNavigations = () => {
  return (
    
    // <header className="mx-auto flex max-w-7xl justify-between p-5">
    //   <div className="flex items-center space-x-10">
    //     <Link href={"/"}>
    //       <span className='text-4xl cursor-pointer'>
    //       Ruchimandal
    //       </span>
    //     </Link>

    //     <div className="hidden items-center space-x-5 md:inline-flex">
    //       <Link href="/parayan">Parayan</Link>
    //       <Link href="/contact">Contact</Link>
    //       <Link href="/follow" className="rounded-full bg-green-600 px-4 py-1 text-white ">
    //         Follow
    //       </Link>
    //     </div>
    //   </div>

    //   <div className="flex items-center space-x-5 text-green-600">
    //     <Link href="/SignIn">Sign In</Link>
    //     <Link href="/get-started" className="rounded-full border border-green-600 px-4 py-1">
    //       Get Started
    //     </Link>
    //   </div>
    // </header>
        <TopNavigation
      identity={{
        href: "/",
        title: "Ruchimandal",
        // logo: {
        //   src:
        //     "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSIzMXB4IiB2aWV3Qm94PSIwIDAgNDMgMzEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiMyMzJmM2UiIHN0cm9rZT0iI2Q1ZGJkYiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MiIgaGVpZ2h0PSIzMCIgcng9IjIiPjwvcmVjdD4KICAgICAgICA8dGV4dCBmb250LWZhbWlseT0iQW1hem9uRW1iZXItUmVndWxhciwgQW1hem9uIEVtYmVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjkiIHk9IjE5Ij5Mb2dvPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=",
        //   alt: "Service"
        // }
      }}
      utilities={[
        
        {
          type: "button",
          iconName: "notification",
          title: "Notifications",
          ariaLabel: "Notifications (unread)",
          badge: true,
          disableUtilityCollapse: false
        },
        {
          type: "menu-dropdown",
          iconName: "settings",
          ariaLabel: "Settings",
          title: "Settings",
          items: [
            {
              id: "settings-org",
              text: "Organizational settings"
            },
            {
              id: "settings-project",
              text: "Project settings"
            }
          ]
        },
        {
          type: "menu-dropdown",
          text: "Customer Name",
          description: "email@example.com",
          iconName: "user-profile",
          items: [
            { id: "profile", text: "Profile" },
            { id: "preferences", text: "Preferences" },
            { id: "security", text: "Security" },
            { id: "signout", text: "Sign out" }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
  );
};

export default TopNavigations;
