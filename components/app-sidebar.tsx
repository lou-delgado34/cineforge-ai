import Link from "next/link";
import {
  Home,
  PlusCircle,
  Folder,
  Images,
  CreditCard,
  Settings,
  Sparkles,
  Coins,
  ListVideo,
  Download,
  LayoutTemplate,
  Shield,
  Palette,
  FileText,
  PenLine,
  Mic,
  AudioLines,
  Smile,
  UserRoundCheck,
  UserCircle,
  Users,
  Clapperboard,
  Film,
  Scissors,
  Cpu,
  BarChart3,
  Rocket,
  Database,
  LockKeyhole,
  Upload,
  Image,
  Video,
  Music,
  Search,
  Wand2,
  BadgeDollarSign,
  Activity,
  TestTube,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Auth Status", href: "/auth-status", icon: LockKeyhole },
  { label: "AI Status", href: "/ai-status", icon: Sparkles },
  { label: "Replicate Status", href: "/replicate-status", icon: Cpu },
  { label: "Replicate Test", href: "/replicate-test", icon: TestTube },
  { label: "Video Storage Status", href: "/video-storage-status", icon: Video },

  { label: "Script Generator", href: "/script-generator", icon: PenLine },
  { label: "Image Prompt Generator", href: "/image-prompts", icon: Wand2 },
  { label: "Image Generator", href: "/image-generator", icon: Image },
  { label: "Video Generator", href: "/video-generator", icon: Video },
  { label: "Voice Generator", href: "/voice-generator", icon: Mic },

  { label: "Create", href: "/create", icon: PlusCircle },
  { label: "Media Upload", href: "/upload", icon: Upload },
  { label: "Library", href: "/library", icon: Images },
  { label: "Asset Browser", href: "/asset-browser", icon: Search },
  { label: "Image Gallery", href: "/image-gallery", icon: Image },
  { label: "Video Gallery", href: "/video-gallery", icon: Video },
  { label: "Audio Gallery", href: "/audio-gallery", icon: Music },

  { label: "Scene Builder", href: "/scene-builder", icon: Clapperboard },
  { label: "Scenes", href: "/scenes", icon: Film },
  { label: "Video Editor", href: "/video-editor", icon: Scissors },
  { label: "Video Projects", href: "/video-projects", icon: ListVideo },
  { label: "Render Queue", href: "/render-queue", icon: ListVideo },
  { label: "Exports", href: "/exports", icon: Download },

  { label: "Scripts", href: "/scripts", icon: FileText },
  { label: "Voices", href: "/voices", icon: AudioLines },
  { label: "Avatar Manager", href: "/avatar-manager", icon: UserCircle },
  { label: "Avatars", href: "/avatars", icon: Users },
  { label: "Lip Sync", href: "/lip-sync", icon: Smile },
  { label: "Lip Sync Jobs", href: "/lip-sync-jobs", icon: UserRoundCheck },

  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "Brand Kit", href: "/brand-kit", icon: Palette },
  { label: "Model Manager", href: "/model-manager", icon: Cpu },
  { label: "Models", href: "/models", icon: Cpu },
  { label: "Platform", href: "/platform", icon: BarChart3 },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Supabase Test", href: "/supabase-test", icon: Database },

  { label: "Credits", href: "/credits", icon: Coins },
  { label: "Credit Test", href: "/credit-test", icon: TestTube },
  { label: "Usage", href: "/usage", icon: Activity },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Subscription", href: "/subscription", icon: BadgeDollarSign },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Stripe Status", href: "/stripe-status", icon: CreditCard },

  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield },
  { label: "Production", href: "/production", icon: Rocket },
];

export function AppSidebar() {
  return (
    <aside className="hidden h-screen w-64 overflow-y-auto border-r border-white/10 bg-black p-5 text-white md:block">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <Sparkles className="h-6 w-6" />
        CineForge AI
      </Link>

      <nav className="mt-10 space-y-2 pb-10">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}