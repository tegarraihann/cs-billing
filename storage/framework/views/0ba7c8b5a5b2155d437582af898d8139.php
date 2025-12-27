<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Halaman Tidak Ditemukan</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            /* Warna & font mengikuti FooterSection */
            --bg-dark: #1f2937;      /* bg-gray-800 */
            --text-main: #f9fafb;    /* putih */
            --text-muted: #d1d5db;   /* abu terang */
            --accent: #8db580;       /* sage */
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            background: var(--bg-dark);
            color: var(--text-main);
            font-family: "Inter", "Jost", system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            text-align: center;
        }

        .wrapper {
            max-width: 640px;
            width: 100%;
        }

        .label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 16px;
            border-radius: 999px;
            border: 1px solid rgba(141, 181, 128, 0.35);
            color: var(--accent);
            font-weight: 700;
            letter-spacing: 0.2px;
            margin-bottom: 16px;
        }

        h1 {
            margin: 0 0 12px;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 0.4px;
        }

        p {
            margin: 0;
            color: var(--text-muted);
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="wrapper" role="main" aria-label="Halaman tidak ditemukan">
        <div class="label">404</div>
        <h1>Page not found</h1>
        <p>Sorry, the page you’re looking for isn’t available or may have moved.</p>
    </div>
</body>
</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views/errors/404.blade.php ENDPATH**/ ?>