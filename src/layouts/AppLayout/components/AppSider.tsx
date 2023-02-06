import { computed, defineComponent, ref, h } from 'vue'
import { Menu, MenuItem, LayoutSider, SubMenu } from 'ant-design-vue'
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { MenuConfig } from '@/types'
import './AppSider.less'

export default defineComponent({
  name: 'AppSider',
  setup() {
    const router = useRouter()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })

    const menuConfig = ref<MenuConfig[]>([
      {
        routeName: 'Dashboard',
        title: 'Dashboard',
        icon: DashboardOutlined
      },
      {
        routeName: 'project',
        title: 'Project',
        icon: ProjectOutlined,
        children: [
          {
            routeName: 'ProjectLoadingEfficiency',
            title: 'Loading Efficiency'
          },
          {
            routeName: 'ProjectError',
            title: 'Application Stability'
          },
          {
            routeName: 'ProjectAPI',
            title: 'API Stability'
          }
        ]
      },
      {
        routeName: 'User',
        title: 'User Management',
        icon: UserOutlined
      }
    ])

    const menuDOM = computed(() => {
      const DOMList: JSX.Element[] = []

      menuConfig.value.forEach(config => {
        if (!Array.isArray(config.children)) {
          DOMList.push(
            <MenuItem
              key={config.routeName}
              onClick={() => router.push({ name: config.routeName })}
            >
              {h(config.icon)}
              <span>{t(config.title)}</span>
            </MenuItem>
          )
        } else {
          DOMList.push(
            <SubMenu
              key={config.routeName}
              title={
                <span>
                  {h(config.icon)}
                  <span>{config.title}</span>
                </span>
              }
            >
              {config.children.map(subConfig => (
                <MenuItem
                  key={subConfig.routeName}
                  onClick={() => router.push({ name: subConfig.routeName })}
                >
                  {subConfig.title}
                </MenuItem>
              ))}
            </SubMenu>
          )
        }
      })

      return DOMList
    })

    return () => (
      <LayoutSider class="sider">
        <div class="sider__logo">
          <img
            class="sider__logo__image"
            src="src/assets/logo.svg"
            alt="logo"
          />
          <div class="sider__logo__text">FEDOG</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
        >
          {menuDOM.value.map(item => item)}
        </Menu>
      </LayoutSider>
    )
  }
})
