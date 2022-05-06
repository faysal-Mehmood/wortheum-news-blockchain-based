import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tt from 'counterpart';
import CloseButton from 'app/components/elements/CloseButton';
import Icon from 'app/components/elements/Icon';
import { Link } from 'react-router';

const SidePanel = ({
    alignment,
    visible,
    hideSidePanel,
    username,
    walletUrl,
}) => {
    if (process.env.BROWSER) {
        visible && document.addEventListener('click', hideSidePanel);
        !visible && document.removeEventListener('click', hideSidePanel);
    }

    const loggedIn =
        username === undefined
            ? 'show-for-small-only'
            : 'SidePanel__hide-signup';

    const makeLink = (i, ix, arr) => {
        // A link is internal if it begins with a slash
        const isExternal = !i.link.match(/^\//) || i.isExternal;
        if (isExternal) {
            const cn = ix === arr.length - 1 ? 'last' : null;
            return (
                <li key={i.value} className={cn}>
                    <a
                        href={i.link}
                        target={i.internal ? null : '_blank'}
                        rel="noopener noreferrer"
                    >
                        {i.label}&nbsp;<Icon name="extlink" />
                    </a>
                </li>
            );
        } else {
            const cn = ix === arr.length - 1 ? 'last' : null;
            return (
                <li key={i.value} className={cn}>
                    <Link to={i.link}>{i.label}</Link>
                </li>
            );
        }
    };

    const sidePanelLinks = {
        internal: [
            {
                value: 'welcome',
                label: tt('navigation.welcome'),
                link: `/welcome`,
            },
            {
                value: 'faq',
                label: tt('navigation.faq'),
                link: `/faq.html`,
            },
            {
                value: 'tags',
                label: tt('navigation.explore'),
                link: `/tags`,
            },
            {
                value: 'market',
                label: tt('navigation.currency_market'),
                link: `${walletUrl}/market`,
            },
            {
                value: 'advertise',
                label: tt('navigation.advertise'),
                link: 'https://wortheum.io',
                isExternal: true,
            },
            {
                value: 'recover_account_step_1',
                label: tt('navigation.stolen_account_recovery'),
                link: `${walletUrl}/recover_account_step_1`,
            },
            {
                value: 'change_password',
                label: tt('navigation.change_account_password'),
                link: `${walletUrl}/change_password`,
            },
            {
                value: 'vote_for_witnesses',
                label: tt('navigation.vote_for_witnesses'),
                link: `${walletUrl}/~witnesses`,
            },
        ],
        organizational: [
            {
                value: 'telegram support group',
                label: tt('navigation.telegram'),
                link: 'https://t.me/wortheumofficial',
            },
            {
                value: 'whitepaper',
                label: tt('navigation.whitepaper'),
                link: 'http://wortheum.io/assets/Whitepaper-2.0.pdf',
            },
            {
                value: 'about',
                label: tt('navigation.about'),
                link: '/about.html',
                internal: true,
            },
        ],
        legal: [
            {
                value: 'privacy',
                label: tt('navigation.privacy_policy'),
                link: '/privacy.html',
            },
            {
                value: 'tos',
                label: tt('navigation.terms_of_service'),
                link: '/tos.html',
            },
        ],
        extras: [
            {
                value: 'login',
                label: tt('g.sign_in'),
                link: '/login.html',
            },
            {
                value: 'signup',
                label: tt('g.sign_up'),
                link: 'https://signup.wortheum.news',
            },
            {
                value: 'post',
                label: tt('g.post'),
                link: '/submit.html',
            },
        ],
    };

    return (
        <div className="SidePanel">
            <div className={(visible ? 'visible ' : '') + alignment}>
                <CloseButton onClick={hideSidePanel} />
                <ul className={`vertical menu ${loggedIn}`}>
                    {sidePanelLinks['extras'].map(makeLink)}
                </ul>
                <ul className="vertical menu">
                    {sidePanelLinks['internal'].map(makeLink)}
                </ul>
                <ul className="vertical menu">
                    {sidePanelLinks['organizational'].map(makeLink)}
                </ul>
                <ul className="vertical menu">
                    {sidePanelLinks['legal'].map(makeLink)}
                </ul>               
            </div>
        </div>
    );
};

SidePanel.propTypes = {
    alignment: PropTypes.oneOf(['left', 'right']).isRequired,
    visible: PropTypes.bool.isRequired,
    hideSidePanel: PropTypes.func.isRequired,
    username: PropTypes.string,
};

SidePanel.defaultProps = {
    username: undefined,
};

export default connect(
    (state, ownProps) => {
        const walletUrl = state.app.get('walletUrl');
        return {
            walletUrl,
            ...ownProps,
        };
    },
    dispatch => ({})
)(SidePanel);
