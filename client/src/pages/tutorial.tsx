import { BookOpen, Calculator, Wrench, ArrowRight, CheckCircle2, Copy, Moon, Sun, Filter, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TutorialStepProps {
  number: number;
  title: string;
  description: string;
  tips?: string[];
}

function TutorialStep({ number, title, description, tips }: TutorialStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
        {number}
      </div>
      <div className="flex-1 space-y-2">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        {tips && tips.length > 0 && (
          <ul className="space-y-1 mt-2">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Tutorial() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-primary" />
            Panduan Penggunaan
          </h1>
          <p className="text-muted-foreground mt-2">
            Tutorial lengkap cara menggunakan Network Tools untuk kalkulasi subnet dan troubleshooting jaringan.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Subnet Calculator</CardTitle>
                  <CardDescription>Cara menghitung informasi subnet dari alamat IP</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <TutorialStep
                number={1}
                title="Masukkan Alamat IP"
                description="Ketik alamat IP yang ingin Anda analisis di kolom 'IP Address'. Formatnya adalah x.x.x.x dimana x adalah angka 0-255."
                tips={[
                  "Contoh: 192.168.1.100, 10.0.0.1, 172.16.0.50",
                  "Aplikasi sudah menyediakan nilai default 192.168.1.100",
                ]}
              />
              
              <Separator />
              
              <TutorialStep
                number={2}
                title="Pilih CIDR / Prefix Length"
                description="Klik dropdown 'CIDR / Prefix Length' dan pilih subnet mask yang sesuai. CIDR menentukan berapa banyak host dalam satu subnet."
                tips={[
                  "/24 = 254 host (paling umum untuk jaringan rumah/kantor kecil)",
                  "/25 = 126 host, /26 = 62 host, /27 = 30 host",
                  "Semakin besar angka CIDR, semakin sedikit host yang tersedia",
                ]}
              />
              
              <Separator />
              
              <TutorialStep
                number={3}
                title="Klik Tombol Calculate"
                description="Setelah memasukkan IP dan memilih CIDR, klik tombol 'Calculate' untuk menampilkan hasil kalkulasi subnet."
                tips={[
                  "Anda juga bisa tekan Enter setelah mengetik IP address",
                ]}
              />
              
              <Separator />
              
              <TutorialStep
                number={4}
                title="Lihat Hasil Kalkulasi"
                description="Panel hasil akan menampilkan informasi lengkap tentang subnet Anda."
              />
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="font-medium text-sm">Penjelasan hasil:</p>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="shrink-0">Network Address</Badge>
                    <span className="text-muted-foreground">Alamat pertama dalam subnet, digunakan untuk identifikasi jaringan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="shrink-0">Broadcast Address</Badge>
                    <span className="text-muted-foreground">Alamat terakhir, digunakan untuk mengirim ke semua host dalam subnet</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="shrink-0">First/Last Usable Host</Badge>
                    <span className="text-muted-foreground">Range alamat IP yang bisa dipakai untuk perangkat</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="shrink-0">Usable Hosts</Badge>
                    <span className="text-muted-foreground">Jumlah perangkat yang bisa terhubung dalam subnet</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="shrink-0">Wildcard Mask</Badge>
                    <span className="text-muted-foreground">Kebalikan dari subnet mask, sering dipakai di ACL router</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <TutorialStep
                number={5}
                title="Salin Hasil"
                description="Klik ikon copy di samping setiap nilai untuk menyalin ke clipboard. Berguna untuk dokumentasi atau konfigurasi perangkat."
              />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                <Copy className="h-4 w-4 shrink-0" />
                <span>Tip: Klik ikon <Copy className="h-3 w-3 inline" /> di samping nilai untuk menyalin</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Network Troubleshooting</CardTitle>
                  <CardDescription>Panduan sistematis untuk diagnosa masalah jaringan</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <TutorialStep
                number={1}
                title="Pilih Kategori Masalah"
                description="Halaman troubleshooting memiliki 5 kategori masalah jaringan. Pilih kategori yang sesuai dengan masalah yang Anda alami."
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Badge variant="outline" className="justify-start">Konektivitas Dasar</Badge>
                <Badge variant="outline" className="justify-start">Performa Jaringan</Badge>
                <Badge variant="outline" className="justify-start">Masalah DNS</Badge>
                <Badge variant="outline" className="justify-start">Firewall & Security</Badge>
                <Badge variant="outline" className="justify-start">Masalah WiFi</Badge>
              </div>
              
              <Separator />
              
              <TutorialStep
                number={2}
                title="Buka Langkah-langkah"
                description="Klik 'View Steps' pada kategori yang dipilih untuk melihat langkah-langkah troubleshooting secara berurutan."
              />
              
              <Separator />
              
              <TutorialStep
                number={3}
                title="Ikuti Setiap Langkah"
                description="Setiap langkah berisi penjelasan, perintah yang harus dijalankan, dan hasil yang diharapkan."
                tips={[
                  "Baca deskripsi untuk memahami tujuan langkah tersebut",
                  "Jalankan command yang disediakan di terminal/CMD",
                  "Bandingkan hasil dengan 'Expected Result'",
                  "Baca 'Tip' jika hasil tidak sesuai harapan",
                ]}
              />
              
              <Separator />
              
              <TutorialStep
                number={4}
                title="Tandai Langkah Selesai"
                description="Centang checkbox di setiap langkah yang sudah Anda selesaikan. Progress akan terupdate secara otomatis."
              />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                <span>Progress Anda tersimpan selama sesi browser. Klik 'Reset Progress' untuk mengulang dari awal.</span>
              </div>
              
              <Separator />
              
              <TutorialStep
                number={5}
                title="Gunakan Filter"
                description="Gunakan tombol filter di pojok kanan untuk fokus pada satu kategori masalah tertentu."
              />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                <Filter className="h-4 w-4 shrink-0" />
                <span>Klik tombol kategori untuk filter, atau 'All' untuk melihat semua kategori</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Fitur Tambahan</CardTitle>
                  <CardDescription>Fitur-fitur lain yang tersedia di aplikasi</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Dark/Light Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Klik ikon bulan/matahari di pojok kanan atas untuk mengganti tema. Mode gelap lebih nyaman untuk mata di malam hari.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Reset</h4>
                  <p className="text-sm text-muted-foreground">
                    Di Subnet Calculator, klik 'Reset' untuk kembali ke nilai default. Di Troubleshooting, klik 'Reset Progress' untuk menghapus semua centang.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Copy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Copy to Clipboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Semua nilai hasil kalkulasi dan command troubleshooting bisa disalin dengan satu klik. Notifikasi akan muncul saat berhasil disalin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Siap Memulai?</h3>
                  <p className="text-sm text-muted-foreground">
                    Kunjungi halaman Subnet Calculator untuk mulai menghitung subnet, atau Troubleshooting untuk diagnosa masalah jaringan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
