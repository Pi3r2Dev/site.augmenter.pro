# scripts/boucle.ps1 -- lanceur du runner GLOBAL du kit /boucle (v2)
# Rien de logique ici : le runner vit dans ~/.claude/skills/boucle/bin/boucle.ps1
# (une copie pour tous les repos), la config de CE repo dans .boucle.json.
# Tous les parametres sont transmis tels quels : -MaxIterations, -Model, ...
$runner = Join-Path $HOME ".claude\skills\boucle\bin\boucle.ps1"
if (-not (Test-Path $runner)) {
    Write-Host "Runner global absent : $runner (kit /boucle non installe sur ce poste)." -ForegroundColor Red
    exit 7
}
& $runner @args
exit $LASTEXITCODE
