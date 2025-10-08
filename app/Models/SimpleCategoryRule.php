<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpleCategoryRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'keyword',
        'category_id',
        'weight',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'weight' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(PettyCashCategory::class, 'category_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeOrderedByWeight($query)
    {
        return $query->orderBy('weight', 'desc');
    }

    // Static method untuk keyword matching
    public static function checkKeywords(string $description): ?array
    {
        $description = strtolower(trim($description));

        if (empty($description)) {
            return null;
        }

        $rules = self::active()
                    ->with('category')
                    ->orderBy('weight', 'desc')
                    ->get();

        $matches = [];

        foreach ($rules as $rule) {
            $keyword = strtolower($rule->keyword);

            // Exact word match (highest priority)
            if (strpos($description, $keyword) !== false) {
                $matches[] = [
                    'rule_id' => $rule->id,
                    'category_id' => $rule->category_id,
                    'category_name' => $rule->category->name,
                    'matched_keyword' => $rule->keyword,
                    'weight' => $rule->weight,
                    'match_type' => 'exact'
                ];
            }
        }

        if (empty($matches)) {
            return null;
        }

        // Return highest weighted match
        usort($matches, function($a, $b) {
            return $b['weight'] <=> $a['weight'];
        });

        $bestMatch = $matches[0];

        return [
            'category_id' => $bestMatch['category_id'],
            'category_name' => $bestMatch['category_name'],
            'matched_keyword' => $bestMatch['matched_keyword'],
            'confidence' => count($matches) > 1 ? 'medium' : 'high',
            'method' => 'keyword_match'
        ];
    }

    // Helper untuk mendapatkan semua keywords untuk kategori tertentu
    public static function getKeywordsForCategory($categoryId): array
    {
        return self::active()
                  ->where('category_id', $categoryId)
                  ->pluck('keyword')
                  ->toArray();
    }
}