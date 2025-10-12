import { Home, ChevronDown, Package, MessageSquare, FileText, Users, Handshake } from 'lucide-react';
import { Link } from 'wouter';
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
  return (
    <Sidebar>
      <SidebarContent className="bg-[#264653]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80">Admin Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-white/90 hover:bg-[#18ac61] hover:text-white" data-testid="button-dropdown-home">
                      <Home />
                      <span>Home Page</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <div className="px-3 py-1.5 text-xs font-medium text-white/60">Management</div>
                      {dropdownItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="text-white/80 hover:bg-[#18ac61] hover:text-white"
                            data-testid={`link-admin-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Link to={subItem.url}>
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.title}</span>
                            </Link>
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
                          <Link to="/admin/about/our-doctors">
                            <Users className="w-4 h-4" />
                            <span>Our Doctors</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="text-white/80 hover:bg-[#18ac61] hover:text-white"
                          data-testid="link-admin-our-partners"
                        >
                          <Link to="/admin/about/our-partners">
                            <Handshake className="w-4 h-4" />
                            <span>Our Partners</span>
                          </Link>
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
