import mysql.connector
from itertools import combinations
conn = mysql.connector.connect(host='127.0.0.1', port=3306, user='root', database='office_app')
cur = conn.cursor()
sql = "SELECT id, amount, description FROM bank_transactions WHERE bank_account_id=1 AND transaction_date BETWEEN '2026-01-01' AND '2026-01-31' AND transaction_type='debit' AND amount <= 700000 ORDER BY amount DESC"
cur.execute(sql)
rows = cur.fetchall()
print('debits<=700k', len(rows))
TARGET=696239
items=[(rid,int(round(float(amt))),desc) for rid,amt,desc in rows]
for r in range(1,8):
    for combo in combinations(items, r):
        if sum(x[1] for x in combo)==TARGET:
            print('found', combo)
            raise SystemExit
print('no exact combo up to 7 items')
