import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, HomeIcon, ExploreIcon, NotificationIcon, MessageIcon, BookmarkIcon, ListsIcon, MoreIcon } from '../images/svg/svgs';
import { SmallAvatar } from '../images/avatars';

export default function Nav({ user, logout }) {
  return (
    <>
         <div>
            <div className="side-nav-header">
                <Logo />
            </div>
            <div className="side-nav-items">
                <ul className="p-0">                  
                {user && <LoginRoutes user={user} logout={logout} />}
                </ul>
            </div>
        </div>
    </>
  );
}



function LoginRoutes({ user, logout  }) {
  return (
    <>
                   <Link  to="/">
                        <li className="side-nav-item flex-align-center" >
                            <div className="side-nav-item-holder">
                                <HomeIcon />
                                <span className="side-nav-text">Home</span>
                            </div>
                        </li>
                    </Link>
                    <Link  to="/explore">
                        <li className="side-nav-item flex-align-center" to="/explore">
                            <div className="side-nav-item-holder">
                                <ExploreIcon />
                                <span className="side-nav-text">Explore</span>
                            </div>
                        </li>
                    </Link>

                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <NotificationIcon />
                            <span className="side-nav-text">Notification</span>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <MessageIcon />
                            <span className="side-nav-text">Messages</span>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <BookmarkIcon />
                            <span className="side-nav-text">Bookmarks</span>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <ListsIcon />
                            <span className="side-nav-text">List</span>
                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">

                            <SmallAvatar width="22"  image={user.picture} />
                            <span className="side-nav-text" onClick={logout}>Logout</span>

                        </div>
                    </li>
                    <li className="side-nav-item flex-align-center">
                        <div className="side-nav-item-holder">
                            <MoreIcon />
                            <span className="side-nav-text">More</span>
                        </div>
                    </li>

                    <div className="btn tweet-btn text-center">Tweet</div>


    </>
  );
}