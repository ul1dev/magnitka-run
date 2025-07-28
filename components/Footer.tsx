import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto text-center space-y-2 text-sm">
        <div>пр. К Маркса, д. 168А, пом. 7, г. Магнитогорск</div>
        <div>09:00-18:00, выходной воскресенье</div>
        <div>
          Тел.: <a href="tel:79128050814" className="text-blue-600">+7 912 805 08 14</a>{' '}
          Email: <a href="mailto:Asiaeuropemgn@gmail.com" className="text-blue-600">Asiaeuropemgn@gmail.com</a>
        </div>
        <div className="space-x-2">
          <Link href="/training" className="underline">Тренировки</Link>
          <span>|</span>
          <Link href="/shop" className="underline">Фирменный магазин</Link>
        </div>
        <div className="space-x-2">
          <Link href="#" className="underline">Политика конфиденциальности</Link>
          <span>|</span>
          <Link href="#" className="underline">Пользовательское соглашение</Link>
        </div>
      </div>
    </footer>
  );
}
