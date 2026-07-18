const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processLog(logPath) {
    if (!fs.existsSync(logPath)) return;
    console.log(`Processing ${logPath}`);
    
    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        try {
            const entry = JSON.parse(line);
            if (entry.source === 'MODEL' && entry.tool_calls) {
                for (const tool of entry.tool_calls) {
                    if (tool.name === 'write_to_file' || tool.name === 'default_api:write_to_file') {
                        const args = tool.args;
                        if (args && args.TargetFile && args.CodeContent) {
                            let target = args.TargetFile.replace(/\\\\/g, '/');
                            if (target.includes('dist/goldmine_newsletter') || target.includes('dist\\\\goldmine_newsletter')) {
                                target = target.replace(/.*dist[\\\/]goldmine_newsletter[\\\/]/i, 'c:/xLab/ahmedabad/goldmine/v2_gfx/apps/desktop/');
                                console.log(`Restoring: ${target}`);
                                fs.mkdirSync(path.dirname(target), { recursive: true });
                                fs.writeFileSync(target, args.CodeContent);
                            }
                        }
                    }
                    if (tool.name === 'multi_replace_file_content' || tool.name === 'default_api:multi_replace_file_content') {
                         console.log(`Warning: Found replacement in ${tool.args.TargetFile} - may need manual check if it was for the source code`);
                    }
                }
            }
        } catch (e) {
            // Ignore parse errors on partial lines
        }
    }
}

async function main() {
    await processLog('C:\\Users\\mail\\.gemini\\antigravity-ide\\brain\\4e266058-e5a3-4ed9-8c18-130ea7abf36a\\.system_generated\\logs\\transcript_full.jsonl');
    await processLog('C:\\Users\\mail\\.gemini\\antigravity-ide\\brain\\5d3e9166-aa4b-4d2f-980f-ad65330a8745\\.system_generated\\logs\\transcript_full.jsonl');
    console.log('Restoration attempt complete.');
}

main();
