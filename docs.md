# 📋 Dokumentasi Deployment ke Hosting

Dokumentasi lengkap untuk setup project Laravel di hosting dengan konfigurasi dual subdomain.

## 🏗️ Arsitektur Deployment

```
Hosting Structure:
/home/username/
├── demo/                          ← Project Laravel utama
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/                    ← Original Laravel public folder
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env
│   └── ...
└── public_html/
    ├── demo.akmalicode.site/      ← Landing page subdomain
    │   ├── index.php              ← Modified Laravel entry point
    │   ├── .htaccess
    │   └── assets/ (css, js, dll)
    └── admineshaka.akmalicode.site/ ← Admin login subdomain
        ├── index.php              ← Modified Laravel entry point
        ├── .htaccess
        └── assets/ (css, js, dll)
```

## 🎯 Domain Configuration

- **demo.akmalicode.site** → Landing page untuk customer (home, about, services, contact)
- **admineshaka.akmalicode.site** → Admin login dan dashboard

---

## 📝 Step-by-Step Deployment

### 1. 📁 Upload Project ke Hosting

1. **Upload project Laravel** ke folder `/home/username/demo/`
2. **Extract** semua files dari zip/tar
3. **Set permissions**:
   ```bash
   chmod -R 755 /home/username/demo
   chmod -R 775 /home/username/demo/storage
   chmod -R 775 /home/username/demo/bootstrap/cache
   ```

### 2. 🌐 Setup Subdomain di cPanel

#### A. Buat Subdomain Landing Page
1. Login ke **cPanel**
2. **Subdomains** → **Create Subdomain**
3. **Subdomain**: `demo`
4. **Domain**: `akmalicode.site`
5. **Document Root**: `/public_html/demo.akmalicode.site`
6. **Create**

#### B. Buat Subdomain Admin
1. **Subdomains** → **Create Subdomain**
2. **Subdomain**: `admineshaka`
3. **Domain**: `akmalicode.site`
4. **Document Root**: `/public_html/admineshaka.akmalicode.site`
5. **Create**

### 3. 📄 Setup index.php untuk Landing Page

**File**: `/public_html/demo.akmalicode.site/index.php`

```php
<?php
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../../demo/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../../demo/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../../demo/bootstrap/app.php';

$app->handleRequest(Request::capture());
```

### 4. 📄 Setup index.php untuk Admin Subdomain

**File**: `/public_html/admineshaka.akmalicode.site/index.php`

```php
<?php
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../../demo/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../../demo/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../../demo/bootstrap/app.php';

// SET ADMIN SUBDOMAIN FLAG
$_SERVER['ADMIN_SUBDOMAIN'] = true;
$_SERVER['HTTP_HOST'] = 'admineshaka.akmalicode.site';

$app->handleRequest(Request::capture());
```

### 5. 🔧 Konfigurasi .env

**File**: `/home/username/demo/.env`

```env
APP_NAME="Solusi Logistik Internasional Anda | Eshaka Wijaya Logistics"
APP_ENV=production
APP_KEY=base64:JJw2seWkUmNtPz6CdvXHxQsI8Z35mZdEhFDPJqLeBdU=
APP_DEBUG=false
APP_URL=https://demo.akmalicode.site
ADMIN_URL=https://admineshaka.akmalicode.site

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# Email Configuration (SMTP Gmail)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tegarraihanakmali@gmail.com
MAIL_PASSWORD="jpbxjkxqeybijmhb"
MAIL_FROM_ADDRESS="eshakawijayalogistics@ewilog.com"
MAIL_FROM_NAME="${APP_NAME}"
MAIL_ENCRYPTION=tls

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### 6. 🔐 Copy Assets & .htaccess

#### A. Copy Assets ke Landing Page
```bash
cp -r /home/username/demo/public/* /public_html/demo.akmalicode.site/
```

#### B. Copy Assets ke Admin Subdomain
```bash
cp -r /home/username/demo/public/* /public_html/admineshaka.akmalicode.site/
```

#### C. Setup .htaccess untuk Landing Page
**File**: `/public_html/demo.akmalicode.site/.htaccess`

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Angular and Vue History API fallback...
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^.*$ /index.php [L]

    # Block admin routes dari public domain
    RewriteRule ^(master-admin|admin-cs|admin-keuangan) - [F,L]
    RewriteRule ^login - [F,L]
    RewriteRule ^dashboard - [F,L]
</IfModule>
```

#### D. Setup .htaccess untuk Admin Subdomain
**File**: `/public_html/admineshaka.akmalicode.site/.htaccess`

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Angular and Vue History API fallback...
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^.*$ /index.php [L]
</IfModule>
```

### 7. 🗄️ Setup Database

1. **Create Database** di cPanel → MySQL Databases
2. **Import database** (jika ada backup):
   ```bash
   mysql -u username -p database_name < backup.sql
   ```
3. **Run migrations** (via terminal/SSH):
   ```bash
   cd /home/username/demo
   php artisan migrate
   php artisan db:seed  # jika ada seeder
   ```

### 8. 🔑 Setup SSL Certificate

1. **cPanel** → **SSL/TLS**
2. **Let's Encrypt** → Generate untuk kedua subdomain:
   - `demo.akmalicode.site`
   - `admineshaka.akmalicode.site`

---

## ⚙️ Konfigurasi yang Perlu Disesuaikan

### 🎨 1. Frontend Assets

Jika menggunakan Vite/Laravel Mix, update konfigurasi build:

**File**: `vite.config.js`
```js
export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
```

### 🌐 2. Domain-Specific Routes

Routes sudah dikonfigurasi untuk domain-specific access. **Tidak perlu diubah** kecuali ada perubahan domain.

### 📧 3. Email Configuration

Update email settings di `.env` sesuai provider:

```env
# Untuk Gmail
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_ENCRYPTION=tls

# Untuk Mailgun
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=your-domain.com
MAILGUN_SECRET=key-xxxxx

# Untuk SendGrid
MAIL_MAILER=sendgrid
SENDGRID_API_KEY=SG.xxxxx
```

### 🔐 4. Security Headers

Tambah security headers di `.htaccess`:

```apache
# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;"
```

---

## 🧪 Testing Checklist

### ✅ Landing Page Testing (demo.akmalicode.site)
- [ ] Homepage loading correctly
- [ ] About page accessible
- [ ] Services page displaying services
- [ ] Contact form sending emails
- [ ] `/login` redirects to admin subdomain
- [ ] Admin routes blocked (404 error)

### ✅ Admin Subdomain Testing (admineshaka.akmalicode.site)
- [ ] Root `/` redirects to login
- [ ] Login form working
- [ ] Dashboard redirects after login
- [ ] Master Admin routes accessible (for masteradmin role)
- [ ] Admin CS routes accessible (for admin_cs role)
- [ ] Admin Keuangan routes accessible (for admin_keuangan role)
- [ ] Logout working correctly

### ✅ Security Testing
- [ ] Cannot access admin routes from landing page domain
- [ ] Cannot access landing page routes from admin domain
- [ ] SSL certificates working on both domains
- [ ] Email sending working correctly
- [ ] File permissions correct (755/775)

---

## 🐛 Troubleshooting

### 1. 500 Internal Server Error
```bash
# Check Laravel logs
tail -f /home/username/demo/storage/logs/laravel.log

# Check file permissions
chmod -R 755 /home/username/demo
chmod -R 775 /home/username/demo/storage
chmod -R 775 /home/username/demo/bootstrap/cache
```

### 2. Assets Not Loading
```bash
# Copy assets lagi
cp -r /home/username/demo/public/build /public_html/demo.akmalicode.site/
cp -r /home/username/demo/public/build /public_html/admineshaka.akmalicode.site/

# Check path di mix-manifest.json
```

### 3. Database Connection Error
```bash
# Test database connection
mysql -u username -p -h localhost database_name

# Check .env database credentials
```

### 4. Email Not Sending
```bash
# Check email logs
tail -f /home/username/demo/storage/logs/laravel.log

# Test SMTP connection
telnet smtp.gmail.com 587
```

### 5. Session/Auth Issues
```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Regenerate app key (HATI-HATI: akan logout semua user)
php artisan key:generate
```

---

## 🔄 Update & Maintenance

### Regular Updates
1. **Backup database** sebelum update
2. **Upload new code** ke `/home/username/demo/`
3. **Copy new assets**:
   ```bash
   cp -r /home/username/demo/public/build /public_html/demo.akmalicode.site/
   cp -r /home/username/demo/public/build /public_html/admineshaka.akmalicode.site/
   ```
4. **Run migrations** jika ada:
   ```bash
   php artisan migrate
   ```
5. **Clear cache**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

### Monitoring
- **Error logs**: `/home/username/demo/storage/logs/laravel.log`
- **Access logs**: cPanel → Raw Access Logs
- **Performance**: cPanel → Metrics → Resource Usage

---

## 📞 Support

Jika ada masalah:
1. **Check logs** terlebih dahulu
2. **Test di local environment**
3. **Compare konfigurasi** dengan dokumentasi ini
4. **Contact hosting support** untuk masalah server

---

**✨ Happy Deployment!** 🚀