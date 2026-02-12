import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowUp,
  Linkedin,
  Github,
  MessageCircle,
  Code2,
  Smartphone,
  Server,
  Cog,
  Paperclip,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import heroTech from "@/assets/hero-tech.jpg";
import projectWeb from "@/assets/project-web.jpg";
import projectApp from "@/assets/project-app.jpg";
import projectApi from "@/assets/project-api.jpg";
import projectAutomation from "@/assets/project-automation.jpg";

const formSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo"),
  contato: z
    .string()
    .trim()
    .min(1, "Contato é obrigatório")
    .max(100, "Contato muito longo"),
  tipo: z.string().min(1, "Selecione um tipo de serviço"),
  mensagem: z
    .string()
    .trim()
    .min(1, "Mensagem é obrigatória")
    .max(1000, "Mensagem muito longa"),
});

type FormData = z.infer<typeof formSchema>;

const navItems = [
  { id: "home", label: "Home" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "orcamento", label: "Orçamento" },
  { id: "contato", label: "Contato" },
];

const projects = [
  {
    icon: Code2,
    title: "Páginas Web Interativas",
    description:
      "Desenvolvimento de interfaces modernas e responsivas com React e TypeScript. Criação de experiências digitais que engajam usuários.",
    image: projectWeb,
    tags: ["React", "TypeScript", "Tailwind CSS"],
    details: {
      title: "Páginas Web Interativas",
      services: [
        "Landing pages modernas e responsivas",
        "Sites institucionais com design personalizado",
        "E-commerce e lojas virtuais",
        "Dashboards e painéis administrativos",
        "Portfólios e sites pessoais",
        "Blogs e sistemas de conteúdo",
      ],
    },
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description:
      "Aplicativos nativos e híbridos com React Native. Design intuitivo e performance otimizada para iOS e Android.",
    image: projectApp,
    tags: ["React Native", "Expo", "Mobile"],
    details: {
      title: "Aplicativos Mobile",
      services: [
        "Apps nativos para iOS e Android",
        "Aplicativos de delivery e marketplace",
        "Apps de gestão e produtividade",
        "Aplicativos de redes sociais",
        "Apps com integração de pagamentos",
        "Notificações push e funcionalidades offline",
      ],
    },
  },
  {
    icon: Server,
    title: "APIs Robustas",
    description:
      "Desenvolvimento de APIs RESTful escaláveis com Node.js e Python. Arquitetura limpa e documentação completa.",
    image: projectApi,
    tags: ["Node.js", "Python", "REST API"],
    details: {
      title: "APIs Robustas",
      services: [
        "APIs RESTful escaláveis",
        "Integração com bancos de dados",
        "Autenticação e autorização segura",
        "Documentação completa com Swagger",
        "Webhooks e integrações de terceiros",
        "Microserviços e arquitetura distribuída",
      ],
    },
  },
  {
    icon: Cog,
    title: "Automações de Processos",
    description:
      "Automatização de fluxos de trabalho com Python e N8N. Integração de sistemas e otimização de processos empresariais.",
    image: projectAutomation,
    tags: ["Python", "N8N", "Automação"],
    details: {
      title: "Automações de Processos",
      services: [
        "Chatbots para atendimento ao cliente",
        "Automatização de agenda e agendamentos",
        "Integração entre sistemas (CRM, ERP, etc.)",
        "Automação de marketing e email",
        "Scraping e extração de dados",
        "Workflows personalizados com N8N",
      ],
    },
  },
];

const techLogos = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "React Native",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  { name: "N8N", logo: "https://n8n.io/favicon.ico" },
];

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      contato: "",
      tipo: "",
      mensagem: "",
    },
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const FORMSPREE_ID = "meelonzv";

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new globalThis.FormData();
      formData.append("nome", data.nome);
      formData.append("contato", data.contato);
      formData.append("tipo", data.tipo);
      formData.append("mensagem", data.mensagem);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Entrarei em contato em breve. Obrigada!",
        });
        form.reset();
        setAttachment(null);
      } else {
        throw new Error("Erro ao enviar");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato por outro meio.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-lg">
            <span className="font-display text-lg font-bold text-primary-foreground">
              GV
            </span>
          </div>
          <ul className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Home Section */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0">
          <img
            src={heroTech}
            alt="Technology background"
            className="h-full w-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-6xl md:text-7xl">
              Transformando ideias em
              <span className="block text-primary">código</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Desenvolvimento web, mobile e automações. Soluções tecnológicas
              completas para impulsionar seu negócio no mundo digital.
            </p>
            <Button
              variant="hero"
              size="xl"
              className="mt-10"
              onClick={() => scrollToSection("sobre")}
            >
              Conheça meu trabalho
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Sobre mim
            </h2>
            <div className="mt-4 h-1 w-20 bg-primary" />
          </motion.div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                Olá! Me chamo{" "}
                <span className="text-foreground font-semibold">Giovana</span>,
                tenho 29 anos e sou desenvolvedora apaixonada por tecnologia,
                movida por desafios e pela criação de soluções digitais
                modernas.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                Sou formada em <span className="text-foreground">Química</span>,
                mas minha curiosidade e interesse pela área de tecnologia me
                levaram a realizar uma transição de carreira. Atualmente, curso{" "}
                <span className="text-foreground">
                  Análise e Desenvolvimento de Sistemas
                </span>
                , onde aprimoro constantemente minhas habilidades técnicas.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                A união entre minha base científica e a programação me
                proporciona uma visão analítica, organizada e estratégica para
                resolver problemas, desenvolver aplicações eficientes e entregar
                soluções de alta qualidade.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h3 className="mb-6 text-xl font-semibold text-foreground">
                Tecnologias
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                {techLogos.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="bg-secondary/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Meus Serviços
            </h2>
            <div className="mt-4 h-1 w-20 bg-primary" />
            <p className="mt-6 max-w-2xl text-muted-foreground">
              Conheça alguns dos serviços que ofereço e exemplos do que posso
              desenvolver para você.
            </p>
            {/* TODO: Descomentar quando tiver o PDF de cases pronto
            <a 
              href="/cases.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Conheça alguns cases que realizei →
            </a>
            */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-12 px-14"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/2"
                  >
                    <Card
                      className="cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-lg"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <project.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 text-sm text-primary font-medium">
                          Clique para ver detalhes →
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12" />
              <CarouselNext className="-right-12" />
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {selectedProject && (
                <selectedProject.icon className="h-6 w-6 text-primary" />
              )}
              {selectedProject?.details.title}
            </DialogTitle>
            <DialogDescription className="pt-4">
              <p className="mb-4 text-foreground">
                {selectedProject?.description}
              </p>
              <h4 className="mb-3 text-lg font-semibold text-foreground">
                O que eu ofereço:
              </h4>
              <ul className="space-y-2">
                {selectedProject?.details.services.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {service}
                  </li>
                ))}
              </ul>
              <Button
                variant="hero"
                className="mt-6 w-full"
                onClick={() => {
                  setSelectedProject(null);
                  scrollToSection("orcamento");
                }}
              >
                Solicitar Orçamento
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Orçamento Section */}
      <section id="orcamento" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Faça seu Orçamento
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary" />
            <p className="mt-6 text-muted-foreground">
              Preencha o formulário abaixo e entrarei em contato para
              discutirmos seu projeto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contato"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contato</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefone ou email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Serviço</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="site">Site</SelectItem>
                          <SelectItem value="aplicativo">Aplicativo</SelectItem>
                          <SelectItem value="automacao">Automação</SelectItem>
                          <SelectItem value="api">API</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva seu projeto ou ideia..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Anexo */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Anexo (opcional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size <= 10 * 1024 * 1024) {
                          setAttachment(file);
                        } else if (file) {
                          toast({
                            title: "Arquivo muito grande",
                            description: "O tamanho máximo é 10MB.",
                            variant: "destructive",
                          });
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                    >
                      <Paperclip className="h-4 w-4" />
                      {attachment ? "Trocar arquivo" : "Anexar arquivo"}
                    </Button>
                    {attachment && (
                      <div className="flex items-center gap-2 rounded-md border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm text-foreground">
                        <span className="max-w-[200px] truncate">
                          {attachment.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setAttachment(null);
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, PNG, JPG ou ZIP — máx. 10MB
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Orçamento"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Contato Section */}
      <section
        id="contato"
        className="border-t border-border/50 bg-secondary/30 py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Vamos Conversar?
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary" />
            <p className="mt-6 text-muted-foreground">
              Me encontre nas redes sociais ou entre em contato diretamente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            <a
              href="https://linkedin.com/in/giovanavictoria"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
            >
              <Linkedin className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="text-sm font-medium text-foreground">
                LinkedIn
              </span>
            </a>

            <a
              href="https://github.com/giivict"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
            >
              <Github className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="text-sm font-medium text-foreground">
                GitHub
              </span>
            </a>

            <a
              href="https://wa.me/5511941998168"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
            >
              <MessageCircle className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="text-sm font-medium text-foreground">
                WhatsApp
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Giovana. Todos os direitos reservados.
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
