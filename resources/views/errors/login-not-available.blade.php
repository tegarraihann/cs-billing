<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Tidak Ditemukan</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --sage-600: #8db580;
            --sage-700: #7ba169;
            --sage-900: #5a7d52;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Jost', sans-serif;
            background: linear-gradient(135deg, #f4f6f3, #e8ece5);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }

        .container {
            max-width: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 48px 40px;
            text-align: center;
            margin: 20px;
        }

        .icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--sage-600), var(--sage-700));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 32px;
            font-size: 32px;
            color: white;
        }

        h1 {
            font-family: 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: var(--sage-900);
            margin-bottom: 16px;
            letter-spacing: -0.5px;
        }

        .subtitle {
            font-size: 18px;
            color: #666;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        .message {
            background: #f8f9fa;
            padding: 24px;
            border-radius: 12px;
            border-left: 4px solid var(--sage-600);
            margin-bottom: 32px;
            text-align: left;
        }

        .message h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--sage-700);
            margin-bottom: 12px;
        }

        .message p {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
        }

        .actions {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            font-size: 14px;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--sage-600), var(--sage-700));
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(141, 181, 128, 0.3);
        }

        .btn-secondary {
            background: #f8f9fa;
            color: #666;
            border: 1px solid #e9ecef;
        }

        .btn-secondary:hover {
            background: #e9ecef;
            color: #333;
        }

        .footer {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #f0f0f0;
            font-size: 12px;
            color: #999;
        }

        @media (max-width: 480px) {
            .container {
                padding: 32px 24px;
                margin: 10px;
            }

            h1 {
                font-size: 24px;
            }

            .subtitle {
                font-size: 16px;
            }

            .actions {
                flex-direction: column;
            }

            .btn {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <h1>Halaman Tidak Ditemukan</h1>
        <p class="subtitle">Halaman yang Anda cari tidak tersedia</p>

        <div class="message">
            <h3>Mohon Maaf</h3>
            <p>
                Halaman yang Anda akses tidak tersedia.
                Silakan kembali ke halaman utama atau hubungi kami jika Anda memerlukan bantuan.
            </p>
        </div>

        <div class="actions">
            <a href="/" class="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12L21 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M3 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M3 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Kembali ke Beranda
            </a>
            <a href="/contact" class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Hubungi Kami
            </a>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Eshaka Wijaya Logistics. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
