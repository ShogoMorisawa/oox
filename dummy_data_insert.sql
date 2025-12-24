INSERT INTO user_results (
    answers,
    function_order,
    tier_map,
    health_status,
    dominant_function,
    second_function,
    title,
    description,
    icon_url
) VALUES
-- 1. Ni-Fe (深海)
(
    '{}', 
    '["Ni", "Fe", "Ti", "Ne", "Fi", "Te", "Si", "Se"]', 
    '{"Ni": "Dominant", "Fe": "Dominant"}', 
    '{"Ni": "O", "Fe": "O"}',
    'Ni', 'Fe', 
    '深海のあたたかい預言者', 
    '静かな深海で、未来の希望を紡ぐ賢者。誰かの痛みに寄り添いながら、進むべき道をそっと照らす灯台のような存在です。', 
    '/images/icons/oox_icon_Fe_Ni.png'
),
-- 2. Ne-Ti (空)
(
    '{}', 
    '["Ne", "Ti", "Fe", "Si", "Ni", "Te", "Fi", "Se"]', 
    '{"Ne": "Dominant", "Ti": "Dominant"}', 
    '{"Ne": "O", "Ti": "O"}',
    'Ne', 'Ti', 
    '成層圏のイカれた発明家', 
    '常識の重力を振り切り、誰も思いつかないアイデアを連発するトリックスター。その思考は光の速さで駆け巡り、退屈な現実を鮮やかな遊園地へと変えてしまいます。', 
    '/images/icons/oox_icon_Ti_Ne.png'
),
-- 3. Se-Fi (荒野)
(
    '{}', 
    '["Se", "Fi", "Te", "Ni", "Si", "Fe", "Ti", "Ne"]', 
    '{"Se": "Dominant", "Fi": "Dominant"}', 
    '{"Se": "O", "Fi": "O"}',
    'Se', 'Fi', 
    '荒野を駆ける情熱のアーティスト', 
    '「今」という瞬間を全力で味わい尽くすハンター。理屈よりも直感と美学を信じ、風のように自由に生きるその姿は、見る人の心に鮮烈な印象を残します。', 
    '/images/icons/oox_icon_Fi_Se.png'
),
-- 4. Te-Si (火山)
(
    '{}', 
    '["Te", "Si", "Ne", "Fi", "Ti", "Se", "Ni", "Fe"]', 
    '{"Te": "Dominant", "Si": "Dominant"}', 
    '{"Te": "O", "Si": "O"}',
    'Te', 'Si', 
    '鋼鉄の城塞司令官', 
    '揺るぎない実績と鉄の規律で組織を導くリーダー。混沌とした状況でも即座に最適解を導き出し、着実に成果を積み上げる信頼の塊です。', 
    '/images/icons/oox_icon_Si_Te.png'
),
-- 5. Fi-Ne (森)
(
    '{}', 
    '["Fi", "Ne", "Si", "Te", "Fe", "Ni", "Se", "Ti"]', 
    '{"Fi": "Dominant", "Ne": "Dominant"}', 
    '{"Fi": "O", "Ne": "O"}',
    'Fi', 'Ne', 
    '迷いの森の夢見る妖精', 
    '自分だけの世界観を大切にする、繊細で心優しい表現者。現実世界には少し生きづらさを感じているけれど、その内面には宝石のような美しい物語が眠っています。', 
    '/images/icons/oox_icon_Ne_Fi.png'
),
-- 6. Ti-Se (雪原/書斎)
(
    '{}', 
    '["Ti", "Se", "Ni", "Fe", "Te", "Si", "Ne", "Fi"]', 
    '{"Ti": "Dominant", "Se": "Dominant"}', 
    '{"Ti": "O", "Se": "O"}',
    'Ti', 'Se', 
    '絶対零度の精密エンジニア', 
    '感情を排し、純粋な論理と物理法則のみを信じる職人。その手にかかれば、どんな複雑なトラブルも一瞬で分解され、完璧な機能美を取り戻します。', 
    '/images/icons/oox_icon_Se_Ti.png'
),
-- 7. Fe-Ni (広場)
(
    '{}', 
    '["Fe", "Ni", "Se", "Ti", "Fi", "Si", "Ne", "Te"]', 
    '{"Fe": "Dominant", "Ni": "Dominant"}', 
    '{"Fe": "O", "Ni": "O"}',
    'Fe', 'Ni', 
    '銀河のカリスマ調律師', 
    '言葉にしなくても相手の心がわかってしまう、天性のコミュニケーター。集団の中に調和をもたらし、みんなが笑顔になれる未来へと自然に導いていく力を持っています。', 
    '/images/icons/oox_icon_Ni_Fe.png'
),
-- 8. Si-Te (地層)
(
    '{}', 
    '["Si", "Te", "Fi", "Ne", "Se", "Ti", "Fe", "Ni"]', 
    '{"Si": "Dominant", "Te": "Dominant"}', 
    '{"Si": "O", "Te": "O"}',
    'Si', 'Te', 
    '図書館の守護者', 
    '歴史と伝統を重んじ、過去の知恵を未来へと継承する番人。派手さはないけれど、その誠実で着実な仕事ぶりが、社会の屋台骨を支えています。', 
    '/images/icons/oox_icon_Te_Si.png'
);

