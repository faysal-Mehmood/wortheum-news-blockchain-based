import React from 'react';
import tt from 'counterpart';
import { SIGNUP_URL } from 'shared/constants';

const SidebarNewUsers = () => (
    <div className="c-sidebar__module">
        <div className="c-sidebar__header">
            <h3 className="c-sidebar__h3">New to Wortheum?</h3>
        </div>
        <div className="c-sidebar__content">
            <ul className="c-sidebar__list">
                <li className="c-sidebar__list-item">
                    <a className="c-sidebar__link" href="/welcome">
                        Quick start guide
                    </a>
                </li>
                <li className="c-sidebar__list-item">
                    <a className="c-sidebar__link" href="https://wortheum.io">
                        The blockchain
                    </a>
                </li>
                <li className="c-sidebar__list-item">
                    <a className="c-sidebar__link" href="/faq.html">
                        FAQs
                    </a>
                </li>
                <li className="c-sidebar__list-item">
                    <a className="c-sidebar__link" href={SIGNUP_URL}>
                        Sign up
                    </a>
                </li>
                <li className="c-sidebar__list-item">
                    <a className="c-sidebar__link" href="/@worthdev">
                        {tt('g.read_offical_blog')}
                    </a>
                </li>
            </ul>
        </div>
    </div>
);

export default SidebarNewUsers;
