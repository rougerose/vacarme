<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;
use SpipLeague\Component\Rector\Set\SpipSetList;

return RectorConfig::configure()
	->withPaths([__DIR__])
	->withRootFiles()
	->withSets([SpipSetList::SPIP_41, LevelSetList::UP_TO_PHP_74])
	->withSkip([__DIR__ . '/lang', __DIR__ . '/vendor'])
;
