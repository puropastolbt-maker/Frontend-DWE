type Props = { 
    current: string; 
    onChange: (page: string) => void; 
    menuOptions: { name: string; content: string; icon?: string }[];
}; 
 
export default function SidebarMenu({ current, onChange, menuOptions }: Props) { 
    return (
        <div className="space-y-4"> 
            <h2 className="text-xl font-bold">MiniPOS</h2> 
            <nav className="flex flex-col gap-2"> 
                {menuOptions.map((mo) => (
                    <button 
                        key={mo.name}
                        className={`text-left p-2 rounded flex items-center gap-2 ${current === mo.name 
                                ? "bg-black text-white" : "hover:bg-gray-100"}`} 
                        onClick={() => onChange(mo.name)} 
                    >
                        {mo.icon && <span>{mo.icon}</span>}
                        <span>{mo.content}</span>
                    </button>
                ))}
            </nav> 
        </div> 
    ); 
} 
