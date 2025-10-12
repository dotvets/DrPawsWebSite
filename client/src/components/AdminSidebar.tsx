import { Home, ChevronDown, Package, MessageSquare, FileText, Users, Handshake } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLocation } from 'wouter';

const menuItems = [
  {
    title: 'Home Page',
    url: '/',
    icon: Home,
  }
];

const dropdownItems = [
  {
    title: 'Service Packages',
    url: '/admin/service-packages',
    icon: Package,
  },
  {
    title: 'Customer Reviews',
    url: '/admin/customer-reviews',
    icon: MessageSquare,
  },
  {
    title: 'Customers Reviews',
    url: '/admin/customers-reviews',
    icon: MessageSquare,
  }
];

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="bg-[#264653]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80">Admin Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white/90 hover:bg-[#18ac61] hover:text-white data-[active=true]:bg-[#18ac61] data-[active=true]:text-white"
                    data-active={location === item.url}
                    data-testid={`link-admin-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-white/90 hover:bg-[#18ac61] hover:text-white" data-testid="button-dropdown-menu">
                      <Package />
                      <span>Management</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {dropdownItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="text-white/80 hover:bg-[#18ac61] hover:text-white"
                            data-testid={`link-admin-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <a href={subItem.url}>
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-white/90 hover:bg-[#18ac61] hover:text-white" data-testid="button-dropdown-about">
                      <FileText />
                      <span>About Page</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <div className="px-3 py-1.5 text-xs font-medium text-white/60">Management</div>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="text-white/80 hover:bg-[#18ac61] hover:text-white"
                          data-testid="link-admin-our-doctors"
                        >
                          <a href="/admin/about/our-doctors">
                            <Users className="w-4 h-4" />
                            <span>Our Doctors</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="text-white/80 hover:bg-[#18ac61] hover:text-white"
                          data-testid="link-admin-our-partners"
                        >
                          <a href="/admin/about/our-partners">
                            <Handshake className="w-4 h-4" />
                            <span>Our Partners</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
