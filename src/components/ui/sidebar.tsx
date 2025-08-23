import * as React from "react"
import {cn} from "@/lib/utils"

export function Sidebar({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <aside
            className={cn(
                "flex h-screen w-64 flex-col border-r bg-muted/40",
                className
            )}
            {...props}
        />
    )
}

export function SidebarContent({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col gap-4 p-4", className)} {...props} />
    )
}

export function SidebarGroup({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col gap-2", className)} {...props} />
    )
}

export function SidebarGroupLabel({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <h4 className={cn("px-2 text-sm font-semibold text-muted-foreground", className)} {...props} />
    )
}

export function SidebarGroupContent({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col gap-1", className)} {...props} />
}

export function SidebarMenu({className, ...props}: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className={cn("flex flex-col gap-1", className)} {...props} />
    )
}

export function SidebarMenuItem({className, ...props}: React.HTMLAttributes<HTMLLIElement>) {
    return <li className={cn("", className)} {...props} />
}

export function SidebarMenuButton({
                                      asChild,
                                      className,
                                      children,
                                      isActive,
                                      ...props
                                  }: {
    asChild?: boolean
    className?: string
    children: React.ReactNode
    isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const Comp: any = asChild ? "span" : "button"
    return (
        <Comp
            className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted",
                isActive && "bg-muted",
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    )
}
