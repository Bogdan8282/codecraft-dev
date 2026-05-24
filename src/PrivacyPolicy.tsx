import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full px-4 py-8 text-gray-800 dark:text-gray-200 text-left">
      <h2 className="text-3xl font-bold pb-6 text-center">
        Політика приватності
      </h2>

      <section className="mb-6">
        <h3 className="font-bold text-white">1. Які дані ми збираємо</h3>
        <p>
          Для забезпечення роботи функцій коментування, створення профілю та
          персоналізації сайту, ми використовуємо сторонній сервіс авторизації{" "}
          <strong>Clerk</strong>.
        </p>
        <p>
          Коли ви входите на сайт через Clerk, ми отримуємо та зберігаємо у
          нашій базі даних такі відомості:
        </p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>
            <strong>Ім'я користувача:</strong> для відображення автора
            коментарів або постів.
          </li>
          <li>
            <strong>Аватар (Фото профілю):</strong> для візуалізації вашого
            акаунта на сайті.
          </li>
        </ul>
        <p>
          Сам процес авторизації (паролі, токени соцмереж, email) повністю
          обробляється сервісом Clerk відповідно до їхньої політики приватності.
          Ми не маємо доступу до ваших паролів.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-bold text-white">
          2. Як ми використовуємо ваші дані
        </h3>
        <p>Зібрані дані використовуються виключно для:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Ідентифікації вас як користувача сайту (наприклад, під час
            публікації коментарів).
          </li>
          <li>
            Відображення вашого публічного профілю в межах функціонала блогу.
          </li>
          <li>Забезпечення безпеки сайту та запобігання спаму.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-bold text-white">3. Зберігання та захист даних</h3>
        <p>
          Ваше ім'я та аватар зберігаються у нашій захищеній базі даних. Ми
          вживаємо належних технічних заходів безпеки для захисту вашої
          інформації від несанкціонованого доступу, зміни або видалення.
        </p>
        <p>
          Дані зберігаються доти, доки існує ваш акаунт, або доки вони потрібні
          для надання послуг блогу.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-bold text-white">4. Ваші права</h3>
        <p>Ви маєте повне право в будь-який момент:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Оновити своє ім'я або аватар через налаштування профілю Clerk на
            нашому сайті.
          </li>
          <li>
            Звернутися до нас із запитом на повне видалення вашого акаунта та
            всіх пов'язаних із ним даних з нашої бази.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-bold text-white">5. Контакти</h3>
        <p>
          Якщо у вас виникли запитання щодо цієї Політики або ви бажаєте
          видалити свої дані, зв'яжіться з нами через{" "}
          <Link to="mailto:bogdanmatrofajlo@gmail.com" className="text-white font-bold">
            електронну пошту
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
