import * as React from 'react'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { PageContainer } from '@toolpad/core/PageContainer'
import CustomAppTitle from '../components/CustomAppTitle'
import SidebarFooter from '../components/SidebarFooter'

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      slots={{
        appTitle: CustomAppTitle,
        sidebarFooter: SidebarFooter,
      }}
    >
      <PageContainer>{props.children}</PageContainer>
    </DashboardLayout>
  )
}
