import * as React from 'react'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { PageContainer } from '@toolpad/core/PageContainer'
import CustomAppTitle from '../components/CustomAppTitle'
import SidebarFooter from '../components/SidebarFooter'

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      defaultSidebarCollapsed
      slots={{
        appTitle: CustomAppTitle,
        sidebarFooter: SidebarFooter,
      }}
    >
      <PageContainer maxWidth='md'>{props.children}</PageContainer>
    </DashboardLayout>
  )
}
