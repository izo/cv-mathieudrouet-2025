import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function SidebarContent() {
  return (
    <div className="sidebar-content">
      <Card className="mb-4">
        <CardHeader className="text-center border-b border-black">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
            <img src="/profile.jpg" alt="Mathieu Drouet" className="w-full h-full object-cover" />
          </div>
          <CardTitle className="text-3xl mb-2 mt-0">Mathieu Drouet</CardTitle>
          <p className="text-base font-normal mt-0 mb-0">Senior Product Manager</p>
        </CardHeader>
      </Card>

      <Card className="mb-4 border-b border-black">
        <CardHeader>
          <CardTitle className="section-title">Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 list-none p-0">
            <li>
              <a href="tel:0767144874" className="font-bold hover:text-gray-700">07 67 14 48 74</a>
            </li>
            <li>
              <a href="mailto:mathieu@drouet.io" className="font-bold hover:text-gray-700">mathieu@drouet.io</a>
            </li>
            <li>Lille / Paris / Bruxelles</li>
            <li>
              <a href="https://linkedin.com/in/mathieudrouet/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gray-700">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/izo" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gray-700">GitHub</a>
            </li>
            <li>
              <a href="https://mathieu-drouet.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gray-700">Portfolio photographique</a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-4 border-b border-black">
        <CardHeader>
          <CardTitle className="section-title">Langues</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5 list-none p-0">
            <li>Français - Natif</li>
            <li>Anglais - Professionnel</li>
            <li>Espagnol - Intermédiaire</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="section-title">Intérêts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5 list-none p-0">
            <li>Musique</li>
            <li>Photographie</li>
            <li>Permaculture</li>
            <li>Art numérique</li>
            <li>Archéologie</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
