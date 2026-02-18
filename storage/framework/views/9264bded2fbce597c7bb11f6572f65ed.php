<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Message</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Jost:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Jost', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }

        .email-container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #8db580, #7ba169);
            color: white;
            padding: 24px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            font-family: 'Inter', sans-serif;
            font-size: 19px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.3px;
        }

        .content {
            padding: 24px;
        }

        .field {
            margin-bottom: 18px;
        }

        .field:last-of-type {
            margin-bottom: 24px;
        }

        .label {
            font-weight: 500;
            color: #7ba169;
            font-size: 13px;
            margin-bottom: 4px;
            display: block;
        }

        .value {
            font-size: 15px;
            color: #333;
            line-height: 1.5;
        }

        .value a {
            color: #7ba169;
            text-decoration: none;
        }

        .message-value {
            background: #f9fafb;
            padding: 16px;
            border-radius: 6px;
            border-left: 3px solid #8db580;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
        }

        .footer {
            padding: 20px 24px;
            border-top: 1px solid #e9ecef;
            text-align: center;
        }

        .company {
            font-weight: 500;
            color: #5a7d52;
            margin-bottom: 6px;
        }

        .details {
            font-size: 12px;
            color: #666;
            line-height: 1.4;
        }

        .details a {
            color: #7ba169;
            text-decoration: none;
        }

        .timestamp {
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #f0f0f0;
        }

        @media (max-width: 600px) {
            body { padding: 10px; }
            .email-container { border-radius: 0; }
            .header, .content, .footer { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Contact Message</h1>
        </div>

        <div class="content">
            <div class="field">
                <div class="label">Name</div>
                <div class="value"><?php echo e($contactData['name']); ?></div>
            </div>

            <div class="field">
                <div class="label">Email</div>
                <div class="value">
                    <a href="mailto:<?php echo e($contactData['email']); ?>"><?php echo e($contactData['email']); ?></a>
                </div>
            </div>

            <div class="field">
                <div class="label">Phone</div>
                <div class="value"><?php echo e($contactData['phone'] ?? '-'); ?></div>
            </div>

            <?php if($contactData['service']): ?>
            <div class="field">
                <div class="label">Service</div>
                <div class="value"><?php echo e(ucfirst(str_replace('-', ' ', $contactData['service']))); ?></div>
            </div>
            <?php endif; ?>

            <div class="field">
                <div class="label">Message</div>
                <div class="message-value"><?php echo e($contactData['message']); ?></div>
            </div>

            <div class="timestamp">
                <?php echo e(date('M j, Y \a\t g:i A')); ?>

            </div>
        </div>

        <div class="footer">
            <div class="company">Eshaka Wijaya Logistics</div>
            <div class="details">
                <a href="mailto:eshakawijayalogistics@ewilog.com">eshakawijayalogistics@ewilog.com</a> •
                <a href="tel:+6221-23095467">(021) 23095467</a>
            </div>
        </div>
    </div>
</body>
</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views\emails\contact-form.blade.php ENDPATH**/ ?>