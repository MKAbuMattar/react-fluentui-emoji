import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import Link from 'next/link';
import { FC } from 'react';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';

import SidebarBg from '@/assets/img/bg2.jpg';
import HighContrastData from '@/data/build.data.high-contrast.json';
import FlatData from '@/data/build.data.flat.json';
import ModernData from '@/data/build.data.modern.json';
import { Fonticons, Modern, Regular, Solid, SVG, Unicode } from '@/icons/index';

import pkg from '../../../package.json';
import { NavBanner, NavGithub, NavTitle } from './style';

type Props = {
  collapsed?: boolean;
  toggled?: boolean;
  handleToggleSidebar?: any;
};

const Nav: FC<Props> = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;

  return (
    <>
      <ProSidebar
        image={SidebarBg.src}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <Link href="/">
            <a>
              <NavTitle>
                <NavBanner>
                  <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
                </NavBanner>
                Fluentui Emoji
              </NavTitle>
            </a>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<DeviconsReactOriginal width={'24'} height={'24'} />}
              suffix={<span className="badge red">{pkg.version}</span>}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<Regular />}
              suffix={
                <span className="badge yellow">{HighContrastData.length}</span>
              }
            >
              <Link href="/high-contrast">
                <a>High Contrast</a>
              </Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<Solid />}
              suffix={<span className="badge yellow">{FlatData.length}</span>}
            >
              <Link href="/flat">
                <a>Flat</a>
              </Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<Modern />}
              suffix={<span className="badge yellow">{ModernData.length}</span>}
            >
              <Link href="/modern">
                <a>Modern</a>
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/MKAbuMattar/react-fluentui-emoji"
              target="__blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span>
                <NavGithub />
              </span>
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                viewSource
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Nav;
